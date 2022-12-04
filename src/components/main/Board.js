import { useState } from "react";
import styled from "styled-components"

import { GraphView, ListView } from "../view";
import useWindowDimensions from "../../utils/windowDimensions";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { isLoginState } from "../../utils/atom";
import testData from "../../testData.json";
import { useNavigate } from "react-router-dom";

export default function Board() {
    const [viewState, setView] = useState(true);
    const {height, width} = useWindowDimensions();
    const userInfo = useRecoilValue(isLoginState);
    const resetUser = useResetRecoilState(isLoginState);
    const navigate = useNavigate();

    const logout = () => {
        resetUser();
        navigate("/");   
    }

    return (
        <StBoard>
            <button onClick={()=>setView(!viewState)}> change view </button>

            <span>
                &nbsp;&nbsp; Hello, {userInfo.id}; &nbsp;&nbsp;
                <button onClick={logout}>Log out</button>
            </span>

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
position: fixed;
transition: margin-left .5s;
height: 100%;
width:100%;
padding: 10px;
padding-left: 250px;
background-color: #CDE0FE;
`;