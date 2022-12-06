import { useState } from "react";
import styled, { keyframes } from "styled-components"

import { GraphView, ListView } from "../view";

import { LogoutSeq } from "../login";

export default function Board() {
    const [viewState, setView] = useState(false);
    const [leftslide, setleftslide] = useState(false);

    return (
        <StBoard>
            <StBoardHeader>
                <StChangeButton onClick={()=>setView(!viewState)}> change view </StChangeButton>
                <LogoutSeq />
            </StBoardHeader>

            <StViewDiv slideAct={leftslide}>
                <ListView 
                    activate={viewState}
                    setOutAct={setleftslide}
                />
                <GraphView
                    activate={!viewState}
                    backgroundColor='rgba(255,255,255,1.0)'
                />
            </StViewDiv>
            <StInform slideAct={leftslide}>test</StInform>
        </StBoard>
    );
}

const slideLeft = keyframes`
  from {
    width: 100%;
  }
  to {
    width: calc(100% - 700px);
  }
`;

const slideInLeft = keyframes`
  from {
    left: 100%;
  }
  to {
    left: calc(100% - 700px);
  }
`;

const StBoard = styled.div`
position: fixed;
transition: margin-left .5s;
height: 100%;
width:100%;
padding: 10px;
padding-left: 250px;
background-color: #CDE0FE;
`;

const StChangeButton = styled.div`
    height: 50px;
    width: 100px;
    background-color: #7AC5CA;
    font-family: sans-serif;
    &:hover {
        background-color: #6699FF;
    }
`;

const StBoardHeader = styled.div`
    height: 100px;
`;

const StViewDiv = styled.div`
    margin: 10px;
    padding: 5px;
    height: 100%;
    animation: ${(props) => (props.slideAct ? slideLeft : null)} 1s linear forwards;
`;

const StInform = styled.div`
  position: absolute;
  top: 100px;
  left: 100%;
  width: 700px;
  height: 100%;
  background-color: white;
  animation: ${(props) => (props.slideAct ? slideInLeft : null)} 1s linear forwards;
`;