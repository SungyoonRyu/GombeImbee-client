import styled from "styled-components";

import { Sidebar, WorkspaceBoard } from "../components/main";

import GraphView from "../components/view/Graph";
import ListView from "../components/view/List";
import testData from "../testData";

export default function Main() {
    const [viewState, setView] = useState(true);

    return (
        <>
            <Sidebar />
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
        </>
    );
}