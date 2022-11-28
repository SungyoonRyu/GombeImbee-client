import { ForceGraph2D } from "react-force-graph";
import ReactDOMServer from 'react-dom/server';
import { useState } from "react";

export default function GraphView(props) {
  var {style = {
    text_size: 16,
    text_font: 'Sans-Serif',
    text_color: 'rgba(0, 0, 0, 1.0)',
    text_align: 'center',
    text_baseline: 'middle'
  }} = props;

  var _previousNode;
  var {backgroundColor = 'rgba(200, 200, 200, 1.0)'} = props;
  const [scale, setScale] = useState(0.0);

  function nodeVisualize(node, ctx, globalScale) {
    // if (node.group == null) return;

    if (ctx.measureText(node.title).width > 8)
      node.visualTitle = node.title.substr(0, 5);
    else
      node.visualTitle = node.title;
      
    setScale(globalScale);

    ctx.fillStyle = node.color;
    ctx.beginPath(); 
    ctx.arc(node.x, node.y,
            ctx.measureText(node.visualTitle).width / 1.7, 
            0, 2 * Math.PI, false); 
    ctx.fill(); 
    
    ctx.font = `${style.text_size/scale}px ${style.text_font}`;
    ctx.textAlign = style.text_align;
    ctx.textBaseline = style.text_baseline;
    ctx.fillStyle = style.text_color;
    ctx.fillText(node.visualTitle, node.x, node.y);
  }

  function nodePointerArea(node, color, ctx) {
    if (node.group == null) return;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y,
            ctx.measureText(node.visualTitle).width / scale, 
            0, 2 * Math.PI, false); 
    ctx.fill(); 
  }

  function nodeGenerateInfo(node) {
    const title_limit = 30;

    node.info = ReactDOMServer.renderToString(
      <div align='left' style={{lineHeight:'18px', margin:10}}>
        <h2> { node.title.length > title_limit ? node.title.substr(0, title_limit) + '...' : node.title}
          <p style={{fontSize:'14px'}}>
            {node.group}
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