import styled from "styled-components";

import { useState } from "react";

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue } from "recoil";
import { workspaceState } from "../../utils/atom";

import { CreatePopup } from "../view";

export default function AddMember() {
    const [memberState, setMemberState] = useState('closed');
    const [memberInput, setMemberInput] = useState();

    const currentWorkspace = useRecoilValue(workspaceState);
    const [createStyle, setCreateStyle] = useState(styleInput);

    const addMember = async (event) => {
        try {
            let server = config.ip + config.port;
            var params = {user_id: memberInput, workspace_id: currentWorkspace.id}
            const res = await axios.post(server+'/workspace/add_workspace_member', params);
            if (res.status != 200) console.log(res.status);
            setMemberState('completed');
            setCreateStyle(styleInput);
        }
        catch (error) { console.log(error); }
    }

    const memberHandle = (event, next) => {
        event.preventDefault();
        if (memberState == 'input') {
            if (!next) {
                setMemberInput('');
                setMemberState('closed');
                setCreateStyle(styleInput);
                return;
            }
            addMember(event);
        }
        else if (memberState == 'completed') {
            setMemberInput('');
            setMemberState('closed');
            setCreateStyle(styleInput);
        }
        else if (memberState == 'failure') {
            setMemberInput('');
            setMemberState('input');
            setCreateStyle(styleInput);
        }
    }

    const inputChange = (event) => {
        setMemberInput(event.target.value);
    }

    const addMemberStr = {
        title: "새로운 맴버 추가하기",
        label: "추가할 맴버 ID",
        type: "Member"
    }

    const memberData = {
        name: memberInput,
        state: memberState,
        error: ''
    }

    const memberChange = {
        click: memberHandle,
        input: inputChange
    }

    return (
        <>
            <StButton onClick={()=>setMemberState('input')}>
                New
            </StButton> 
            <CreatePopup
                isOpen={memberState != 'closed'}
                data={memberData}
                onChange={memberChange}
                string={addMemberStr}
                style={createStyle}
            />
        </>
    );
}

const StButton = styled.button`
    display: inline-block;
    margin: 5px auto 5px 10px;
    height: 30px;
    width: 130px;
    background-color: #5999FE;
    border: none;
    border-radius: 20px;
    font-size: 20px;
    color: white;
    &:hover {
        background-color:#00368C;
    }
`;


let styleInput = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.45)",
        zIndex: 10,
    },
        content: {
        display: "flex",
        alignItems: "initial",
        justifyContent: "flex-start",
        background: "#EAEAEA",
        overflow: "auto",
        top: "25vh",
        left: "29vw",
        right: "29vw",
        bottom: "35vh",
        WebkitOverflowScrolling: "touch",
        borderRadius: "14px",
        outline: "none",
        zIndex: 10
    }
}