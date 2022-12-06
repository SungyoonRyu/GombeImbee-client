import { useState } from "react";
import styled, { keyframes } from "styled-components"

import { GraphView, InfoView, ListView } from "../view";

import Topbar from "./Topbar";

export default function Board() {
    const [viewState, setView] = useState(false);
    const [leftslide, setleftslide] = useState(false);
    const [current, setCurrent] = useState(null);

    const changeView = (event) => {
        setView(!viewState);
    }

    const clickHandle = (node) => {
        setleftslide(true);
        setCurrent(node);
    }

    return (
        <StBoard>
            <StBoardHeader>
                <Topbar
                    changeView={changeView}
                />
            </StBoardHeader>

            <StViewDiv slideAct={leftslide}>
                <ListView 
                    activate={viewState}
                    clickHandle={clickHandle}
                />
                <GraphView
                    activate={!viewState}
                    clickHandle={clickHandle}
                    backgroundColor='rgba(255,255,255,1.0)'
                />
            </StViewDiv>

            <InfoView
                slideAct={leftslide}
                node={current}
            />
        </StBoard>
    );
}

const StBoard = styled.div`
position: fixed;
transition: margin-left .5s;
height: 100%;
width:100%;
padding: 10px;
padding-left: 250px;
background-color: #CDE0FE;
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

const slideLeft = keyframes`
  from {
    width: 100%;
  }
  to {
    width: calc(100% - 700px);
  }
`;