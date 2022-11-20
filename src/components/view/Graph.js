import { useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import Preview from './Preview';

export default function Graph(props) {
  const [previewState, openPreview] = useState(false);
  const [currentNode, setCurrentNode] = useState();

  var {style = {
    text_size: 16,
    text_font: 'Sans-Serif',
    text_color: 'rgba(0, 0, 0, 1.0)',
    text_align: 'center',
    text_baseline: 'middle'
  }} = props;

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
            ctx.measureText(node.id).width / 1.7, 
            0, 
            2 * Math.PI, 
            false); 
    ctx.fill(); 
  }
  
  function nodeVisualizeText(node, ctx) {
    ctx.textAlign = style.text_align;
    ctx.textBaseline = style.text_baseline;
    ctx.fillStyle = style.text_color;
    ctx.fillText(node.id, node.x, node.y);
  }

  function onNodeHover(node, prevNode) {
    if (node != null) {
      openPreview(true);
      setCurrentNode(node);
    }
    else {
      openPreview(false);
    }
  }
  
  function onNodeClick(node) {
    if (node != null)
      console.log("Click: " + node.id)
  }

  return (
    <>
      { previewState ? 
        <Preview 
          node={currentNode}
        /> : null
      }
      <ForceGraph2D 
        graphData={props.nodeData}
        onNodeHover={onNodeHover}
        onNodeClick={onNodeClick}
        nodeAutoColorBy="group"
        nodeCanvasObject={nodeVisualize}
      />
    </>
  )
}