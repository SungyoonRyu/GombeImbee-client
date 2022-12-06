import { useState } from "react";
import styled from "styled-components"

import { GraphView, ListView } from "../view";

import Topbar from "./Topbar";

export default function Board() {
    const [viewState, setView] = useState(false);

    const changeView = (event) => {
        setView(!viewState);
    }

    return (
        <StBoard>
            <StBoardHeader>
                <Topbar
                    changeView={changeView}
                />
            </StBoardHeader>

            <ListView 
                activate={viewState}
            />
            <GraphView
                activate={!viewState}
                backgroundColor='rgba(200,200,200,1.0)'
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