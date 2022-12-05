import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { nodeData, groupData } from "../../utils/atom";

export default function ListView(props) {
  const nodes = useRecoilValue(nodeData);
  const groups = useRecoilValue(groupData);

  if (props.activate) {
    return(
      <StList>
        {groups.map((group) => {
          return (
            <StGroup key={group.id}>
              <StGroupName> {group.title} </StGroupName>
              {nodes.filter(node => node.group === group.title)
                .map((node) => {
                  return (
                    <StBookNode key={node.id}> 
                      <StBookName> 
                        {node.title} 
                      </StBookName>
                      <p style={{fontFamily: 'sans-serif'}}>{node.url}</p>
                    </StBookNode>
                  );
                }
              )}
            </StGroup>
          );
        })}
      </StList>
    );
  }
}

const StList = styled.div`
  
  display: flex;
  overflow: auto;
  position: static;
  width: 100%;
`;

const StGroup = styled.div`
  width: 300px;
  margin: 10px 10px;
`;

const StGroupName = styled.h2`
  border-radius: 10px;
  margin: 5px 5px 20px;
  padding 10px;
  background-color: #5999FE;
  text-align: center;
  font-size: 20px;
  height: 40px;
  width: 100%;
  font-weight: bold;
`;

const StBookNode = styled.div`
  background-color: #ffffff;
  overflow: visible;
  border-radius: 10px;
  width: 100%;
  margin: 5px;
  padding: 5px;
`;

const StBookName = styled.p`
  margin: 5px 0px;
  font-size: 20px;
`;