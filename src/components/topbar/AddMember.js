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

    const addMember = async (event) => {
        try {
            let server = config.ip + config.port;
            var params = {user_id: memberInput, workspace_id: currentWorkspace.id}
            const res = await axios.post(server+'/workspace/add_workspace_member', params);
            if (res.status != 200) console.log(res.status);
            setMemberState('completed');
        }
        catch (error) { console.log(error); }
    }

    const memberHandle = (event, next) => {
        event.preventDefault();
        if (memberState == 'input') {
            if (!next) {
                setMemberInput('');
                setMemberState('closed');
                return;
            }
            addMember(event);
        }
        else if (memberState == 'completed') {
            setMemberInput('');
            setMemberState('closed');
        }
        else if (memberState == 'failure') {
            setMemberInput('');
            setMemberState('input');
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