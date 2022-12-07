import { useState } from "react";
import styled, { keyframes } from "styled-components"

import { AddGroup, AddBookmark } from "../Board";

import { GraphView, InfoView, ListView } from "../view";
import Topbar from "./Topbar";

export default function Board() {
    const [viewState, setView] = useState(false);
    const [leftslide, setleftslide] = useState(false);
    const [current, setCurrent] = useState({});
    
    const [addState, setAddState] = useState('closed');
    const [group_id, setGroupId] = useState('');

    const [addGroup, setAddGroup] = useState('closed');

    const clickHandle = (node) => {
        setleftslide(true);
        setCurrent(node);
    }

    const addBookmark = (group_id) => {
        setAddState('input');
        setGroupId(group_id);
    }

    return (
        <StBoard>
            <StBoardHeader>
                <Topbar
                    changeView={()=>setView(!viewState)}
                />
            </StBoardHeader>

            <StViewDiv slideAct={leftslide}>
                <ListView 
                    activate={viewState}
                    clickHandle={clickHandle}
                    addBookmark={addBookmark}

                    addGroup={setAddGroup}
                />
                <GraphView
                    activate={!viewState}
                    clickHandle={clickHandle}
                    addBookmark={addBookmark}
                    backgroundColor='rgba(255,255,255,1.0)'
                />
            </StViewDiv>

            <StInform slideAct={leftslide}>
                <div onClick={()=>{setCurrent({});setleftslide(false);}}>X</div>
                <StVirtualBrowser>
                    <StIframe src={"https://youngest-programming.tistory.com/14"} />
                </StVirtualBrowser>

                <InfoView
                    slideAct={leftslide}
                    node={current}
                    setNode={setCurrent}
                />

                <AddBookmark 
                    group_id={group_id}
                    addState={addState}
                    setAddState={setAddState}
                />

                <AddGroup
                    addGroup={addGroup}
                    setAddGroup={setAddGroup}
                />
            </StInform>
        </StBoard>
    );
}

const StBoard = styled.div`
position: fixed;
height: 100%;
width:100%;
padding: 0px;
padding-left: 250px;
background-color: #CDE0FE;
`;

const StBoardHeader = styled.div`
    height: 100px;
    min-width: 750px;
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
  }`;

  const slideInLeft = keyframes`
  from {
    left: 100%;
  }
  to {
    left: calc(100% - 700px);
  }
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

const StVirtualBrowser = styled.div`
  width: 690px;
  height: 650px;
  overwrap: scroll;
`;
const StIframe = styled.iframe`
  width: 690px;
  height: 100%;
`;