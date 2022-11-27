import styled from "styled-components";

import { Sidebar } from "../components/main";
import Graph from "../components/view/Graph";

import data from "../testData.json";

export default function Main() {
    return (
        <>
            <Sidebar />
            <Graph
            activate={true}
            nodeData={data}
            size={{width: 800, height: 600}}
            backgroundColor='rgba(0,0,0,1.0)'/>
        </>
    );
}