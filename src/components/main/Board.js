import { useState } from "react";
import styled from "styled-components"

import { GraphView, ListView } from "../view";

import testData from "../../testData.json";

export default function Board() {
    const [viewState, setView] = useState(true);

    return (
        <StBoard>
            <button onClick={()=>setView(!viewState)}> change view </button>
            <ListView 
                activate={viewState}
                nodeData={testData}
            />
            <GraphView
                activate={!viewState}
                nodeData={testData}
                size={{width: 800, height: 600}}
                backgroundColor='rgba(200,200,200,1.0)'
            />
        </StBoard>
    );
}

const StBoard = styled.div`
transition: margin-left .5s;
margin-left: 250px;
height: 100%;
padding: 16px;
background-color: #89A0C5;
`;