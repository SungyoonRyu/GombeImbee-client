import { useState } from "react";
import styled from "styled-components"

import { GraphView, ListView } from "../view";
import useWindowDimensions from "../../utils/windowDimensions";

import testData from "../../testData.json";

export default function Board() {
    const [viewState, setView] = useState(false);
    const {height, width} = useWindowDimensions();

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
                size={{width: width-281, height: height-51}}
                backgroundColor='rgba(200,200,200,1.0)'
            />
        </StBoard>
    );
}

const StBoard = styled.div`
transition: margin-left .5s;
margin-left: 250px;
height: 100%px;
padding: 16px;
background-color: #89A0C5;
`;