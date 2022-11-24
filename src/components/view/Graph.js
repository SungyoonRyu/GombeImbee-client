import { ForceGraph2D } from "react-force-graph";
import ReactDOMServer from 'react-dom/server';

export default function Graph(props) {
  var {style = {
    text_size: 16,
    text_font: 'Sans-Serif',
    text_color: 'rgba(0, 0, 0, 1.0)',
    text_align: 'center',
    text_baseline: 'middle'
  }} = props;

  var _previousNode;
  var {backgroundColor = 'rgba(200, 200, 200, 1.0)'} = props;

  function nodeVisualize(node, ctx, globalScale) {
    nodeVisualizeShape(node=node, ctx=ctx, globalScale=globalScale);
    nodeVisualizeText(node=node, ctx=ctx)
  }

  function nodeVisualizeShape(node, ctx, globalScale) {
    ctx.font = `${style.text_size/globalScale}px ${style.text_font}`;
    ctx.fillStyle = node.color;
    ctx.beginPath(); 
    ctx.arc(node.x,
            node.y,
            ctx.measureText(node.title).width / 1.7, 
            0, 
            2 * Math.PI, 
            false); 
    ctx.fill(); 
  }
  
  function nodeVisualizeText(node, ctx) {
    ctx.textAlign = style.text_align;
    ctx.textBaseline = style.text_baseline;
    ctx.fillStyle = style.text_color;
    ctx.fillText(node.title, node.x, node.y);
  }

  function nodePointerArea(node, color, ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x,
      node.y,
      ctx.measureText(node.title).width / 3.0, 
      0, 
      2 * Math.PI, 
      false); 
    ctx.fill(); 
  }

  function nodeGenerateInfo(node) {
    node.info = ReactDOMServer.renderToString(
      <div align='left' style={{lineHeight:'10px', margin:10}}>
        <h2> {node.title}
          <p style={{fontSize:'14px'}}>
            Group: {node.group}
          </p>
        </h2>
      </div>
    );
  } 

  function nodeClearInfo(node) {
    node.info = null;
    _previousNode = null;
  }

  function onNodeHover(node) {
    if (node != null) {
      if (node === _previousNode) return;
      nodeGenerateInfo(node);
      _previousNode = node;
    }
  }

  if (props.activate) {
    return (
      <div>
        <ForceGraph2D 
          nodeLabel="info"
          nodeAutoColorBy="group"
          graphData={props.nodeData}
          width={props.size.width}
          height={props.size.height}
          backgroundColor={backgroundColor}
          onNodeHover={onNodeHover}
          onNodeClick={props.onNodeClick}
          nodeCanvasObject={nodeVisualize}
          nodePointerAreaPaint={nodePointerArea}
        />
      </div>
    )
  }
}