import styled, { keyframes } from "styled-components";
import { useState } from "react";

import { useRecoilValue } from "recoil";
import { nodeData, groupData } from "../../utils/atom";
import { DeleteGroup } from "../Board";

export default function SearchView(props) {
  const groups = useRecoilValue(groupData);

  if (props.activate) {
    return(
        <StList>
        {groups.map((group) => {
          return (
            <>
            <StGroup key={group.id}>
              <StGroupName>
                {group.title}
               </StGroupName>
              { props.nodes ? props.nodes.filter(node => node.group_id === group.id)
                .map((node) => {
                  return (
                    <StBookNode key={node.id} nodeId={node.id} checkID={props.currentNode.id} onClick={()=>{props.clickHandle(node)}}> 
                      <StBookName>
                        {node.title} 
                      </StBookName>
                      <p style={{fontFamily: 'sans-serif'}}>{node.url}</p>
                    </StBookNode> 
                  );
                }
              ) : null }
            </StGroup>
            </>
          );
        })}

        <StGroup>
          <StGroupName onClick={()=>props.addGroup('input')}>
            +
          </StGroupName>
        </StGroup>
      </StList>
    );
  }
}

const StList = styled.div`
  display: flex;
  overflow: auto;
  position: static;
  width: 100%;
  height: 960px;
`;

const StGroup = styled.div`
  position: relative;
  width: 300px;
  min-width: 300px;
  margin: 10px 10px;
`;

const StGroupName = styled.h2`
  border-radius: 10px;
  margin: 5px 5px 20px;
  padding 17px;
  background-color: #5999FE;
  text-align: center;
  font-size: 20px;
  height: 55px;
  width: 100%;
  font-weight: bold;
`;

const StBookNode = styled.div`
  background-color: ${(props) => ((props.checkID == props.nodeId) ? "black;" : "#ffffff;" )}
  color: ${(props) => ((props.checkID == props.nodeId) ? "white;" : "#;black" )}
  overflow: visible;
  border-radius: 10px;
  width: 100%;
  margin: 5px;
  padding: 8px;
  &:hover {
    background-color: ${(props) => ((props.checkID == props.nodeId) ? "black;" : "#D3D3D3;" )}
    color: ${(props) => ((props.checkID == props.nodeId) ? "white;" : "#black;" )}
  }
`;

const StBookName = styled.p`
  margin: 5px 0px;
  font-size: 20px;
`;

const StDeleteButton = styled.button`
    margin: 0px
    display: inline-block;
    margin: 0px 0px 16px;
    width:40px;
    height: 21px;
    font-size: 11px;
    font-wight: bold;
    background-color: transparent;
    border: #474747 solid 0.2px;
    color: #474747;
    &:hover {
        background-color: white;
        border-color: black;
        color: black;
    }
`;