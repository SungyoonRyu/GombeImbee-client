import { ForceGraph2D } from "react-force-graph";
import ReactDOMServer from 'react-dom/server';
import { useState, useCallback, useRef } from "react";

export default function GraphView(props) {
  var {style = {
    text_size: 16,
    text_font: 'Sans-Serif',
    text_color: 'rgba(0, 0, 0, 1.0)',
    text_align: 'center',
    text_baseline: 'middle'
  }} = props;

  var _previousNode;
  var _currentWorkspace;
  var _currentGroup;

  var {backgroundColor = 'rgba(200, 200, 200, 1.0)'} = props;
  const [scale, setScale] = useState(0.0);
  const graphRef = useRef();

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
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y,
            ctx.measureText(node.visualTitle).width / scale, 
            0, 2 * Math.PI, false); 
    ctx.fill(); 
  }

  function substr(limit, str) {
    return str.length > limit ? str.substr(0, limit) + '...' : str;
  }

  function nodeGenerateTooltip(node) {
    const title_limit = 30;
    const url_limit = 30;
    const info_limit = 30;

    node.tooltip = ReactDOMServer.renderToString(
      <div align='left'>
        <span>
          <p>
            제목: <br/>
            <span>
              { substr(title_limit, node.title) }
            </span>
          </p>
          <br/>
          <p>
            URL: <br/>
            <span>
              { substr(url_limit, node.url) }
            </span>
          </p>
          <br/>
          <p>
            태그: <br/>
            <span>
              { node.tags.map((tag) => {
                return(
                  <span key={tag.id}>
                    #{tag}&nbsp;
                  </span> 
                );
              })}
            </span>
          </p>
          <br/>
          <p>
            설명: <br/>
            <span>
              { substr(info_limit, node.info) }
            </span>
          </p>
        </span>
      </div>
    );
  } 

  function nodeClearTooltip(node) {
    node.tooltip = null;
    _previousNode = null;
  }

  function onNodeHover(node) {
    if (node != null) {
      if (node === _previousNode) return;
      if (node.group == null) return;
      nodeGenerateTooltip(node);
      _previousNode = node;
    }
  }

  const onNodeClick = useCallback(node => {
    if (node == null) return;
    if (node.type == 'node') {
      if (props.onNodeClick != null) {
        props.onNodeClick(node);
      }
    }
    else if (node.type == 'group') {
      graphRef.current.zoomToFit(500, 100, (ele) => ele.group == node.title);
      _currentWorkspace = node.workspace;
      _currentGroup = node.title;
    }
    else if (node.type == 'workspace') {
      graphRef.current.zoomToFit(500, 100, (ele) => ele.workspace == node.title);
      _currentWorkspace = node.title;
    }
  }, [graphRef]);

  const onBackgroundClick = useCallback(node => {
    graphRef.current.zoomToFit(500, 100, (ele) => ele.workspace == _currentWorkspace);
  }, [graphRef]);

  if (props.activate) {
    return (
      <div>
        <ForceGraph2D
          ref={graphRef}
          nodeLabel="tooltip"
          nodeAutoColorBy="group"
          graphData={props.nodeData}
          width={props.size.width}
          height={props.size.height}
          backgroundColor={backgroundColor}
          onNodeHover={onNodeHover}
          onNodeClick={onNodeClick}
          nodeCanvasObject={nodeVisualize}
          nodePointerAreaPaint={nodePointerArea}
          onBackgroundClick={onBackgroundClick}
        />
      </div>
    )
  }
}