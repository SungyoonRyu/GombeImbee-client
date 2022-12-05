import { ForceGraph2D } from "react-force-graph";
import cloneDeep from 'lodash/cloneDeep';

import ReactDOMServer from 'react-dom/server';
import { useState, useCallback, useRef, useEffect } from "react";

import { useRecoilValue } from "recoil";
import { nodeData, linkData, groupData, workspaceData, workspaceState } from "../../utils/atom";

import useWindowDimensions from "../../utils/windowDimensions";

import Tooltip from "./Tooltip";

export default function GraphView(props) {
  const TYPE = {
    NODE: 0,
    GROUP: 1,
    WORKSPACE: 2
  };
  
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
  const graphRef = useRef();
  const [scale, setScale] = useState(0.0);
  const {height, width} = useWindowDimensions();

  const [graphData, setGraphData] = useState({nodes: [], links: []});
  const node = useRecoilValue(nodeData);
  const link = useRecoilValue(linkData);
  const group = useRecoilValue(groupData);
  const workspace = useRecoilValue(workspaceData);
  const currentWorkspace = useRecoilValue(workspaceState);

  useEffect(() => {
    setGraphData(graphData => {
      let links = cloneDeep(link);

      let workspaces = {
        id: -1,
        title: workspace[currentWorkspace],
        type: TYPE.WORKSPACE
      };

      let groups = group.map(ele => {
        links.push({
          source: workspaces.id,
          target: 100000000 + ele.id
        });

        return {
          id: 100000000 + ele.id,
          title: ele.title,
          type: TYPE.GROUP
        };
      });

      let nodes = cloneDeep(node)
        .map(ele => {
          let sourceGroup = groups.find(ele_g => ele_g.title === ele.group);
          links.push({
            source: sourceGroup.id,
            target: ele.id
          })

          ele.type = TYPE.NODE
          return ele;
      });

      graphData = {
        nodes: [workspaces, ...groups, ...nodes],
        links: links
      }
      return graphData;
    })
  }, [node, link, group, workspace]);

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

  function nodeGenerateTooltip(node) {
    node.tooltip = ReactDOMServer.renderToString(
      <Tooltip
        node={node}
      />
    );
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
    else if (node.type == TYPE.GROUP) {
      graphRef.current.zoomToFit(500, 100, (ele) => ele.group == node.title);
      _currentWorkspace = node.workspace;
      _currentGroup = node.title;
    }
    else if (node.type == TYPE.WORKSPACE) {
      graphRef.current.zoomToFit(500, 100);
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
          graphData={graphData}
          width={width-281}
          height={height-51}
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