import { ForceGraph2D } from "react-force-graph";
import nodeData from "../../testData";

const fontSize = 14;
const fontStyle = 'Sans-Serif'
const fontColor = 'rgba(0, 0, 0, 1.0)'

export default function GraphView() {
    return (
      <ForceGraph2D 
        graphData={nodeData}
        onNodeHover={onNodeHover}
        onNodeClick={onNodeClick}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          ctx.font = `${fontSize/globalScale}px ${fontStyle}`;
          ctx.fillStyle = node.color;
          ctx.beginPath(); 
          ctx.arc(node.x,
                  node.y,
                  ctx.measureText(node.id).width / 1.7, 
                  0, 
                  2 * Math.PI, 
                  false); 
          ctx.fill(); 

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = fontColor;
          ctx.fillText(node.id, node.x, node.y);
        }}
      />
    )
}

function onNodeHover(node) {
    if (node != null)
      console.log("Hover: " + node.name)
}
  
function onNodeClick(node) {
    if (node != null)
      console.log("Click: " + node.name)
}