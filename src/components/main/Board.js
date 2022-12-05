import { useState } from "react";
import styled from "styled-components"

import { GraphView, ListView } from "../view";

import { LogoutSeq } from "../login";

export default function Board() {
    const [viewState, setView] = useState(false);

    return (
        <StBoard>
            <button onClick={()=>setView(!viewState)}> change view </button>

            <span>
                <LogoutSeq />
            </span>

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