import styled from "styled-components"

import Graph from "../view/Graph";

import data from "../../testData.json";

export default function WorkspaceBoard() {
    return (
        <StBoard>
            list
            <Graph
            activate={true}
            nodeData={data}
            size={{width: 800, height: 600}}
            backgroundColor='rgba(255,255,255,1.0)'/>
        </StBoard>
    );
}

const StBoard = styled.div`
transition: margin-left .5s;
margin-left: 250px;
padding: 16px;
`;