import { useState } from "react";
import styled from "styled-components"

import { GraphView, ListView } from "../view";

import { LogoutSeq } from "../login";

export default function Board() {
    const [viewState, setView] = useState(false);

    return (
        <StBoard>
            <StBoardHeader>
                <StChangeButton onClick={()=>setView(!viewState)}> change view </StChangeButton>
                <LogoutSeq />
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