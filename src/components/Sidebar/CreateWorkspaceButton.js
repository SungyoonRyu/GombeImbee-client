import styled from "styled-components";

import { useState } from "react";

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { workspaceData, workspaceState, isLoginState } from "../../utils/atom";

import { CreatePopup } from "../view";

export default function CreateWorkspaceButton(props) {
    const userState = useRecoilValue(isLoginState);
    const setWorkspaceData = useSetRecoilState(workspaceData);
    const setCurrentWorkspace = useSetRecoilState(workspaceState);

    const [createState, setCreateState] = useState('closed');
    const [createInput, setCreateInput] = useState("");
    const [createError, setCreateError] = useState("");

    const createWorkspace = async (event) => {
        try {
            let error, server = config.ip + config.port;
            var params = {title: createInput, own_user_id: userState.id};
            const addRes = await axios.post(server+'/workspace/add', params);
            if (addRes.status == 200) {
                params = {id: userState.id};
                const workspaceRes = await axios.get(server+'/workspace/get_list', {params: params});
                if (workspaceRes.status == 200) {
                    setWorkspaceData(workspaceRes.data);
                    setCurrentWorkspace(workspaceRes.data.find((ele)=>ele.title == createInput));
                    setCreateState('completed');
                    return;
                }
                else error = workspaceRes.status;
            }
            else error = addRes.status;
            setCreateError('ERROR: ' + error);
            setCreateState('failure');
        }
        catch (error) { console.log(error); }
    }

    const createHandle = (event, next) => {
        event.preventDefault();
        if (createState == 'input') {
            if (!next) {
                setCreateInput("");
                setCreateState('closed');
                return;
            }
            if (createInput.length == 0 || createInput.includes(' ')) {
                setCreateError("Workspace 이름에는 공백이 포함될 수 없습니다.");
                setCreateState('failure');
            }
            else createWorkspace(event);
        }
        else if (createState == 'completed') {
            setCreateInput("");
            setCreateState('closed');
        }
        else if (createState == 'failure') {
            setCreateInput("");
            setCreateState('input');
        }
    }

    const createInputChange = (event) => {
        setCreateInput(event.target.value);
    }

    const createPopupStr = {
        title: "새로운 Workspace 추가하기",
        label: "Workspace 이름",
        type: "workspace",
    }

    const createData = {
        name: createInput,
        error: createError,
        state: createState
    }

    const createChange = {
        click: createHandle,
        input: createInputChange
    }  

    return (
        <>
            <StNewButton onClick={()=>setCreateState('input')}>
                + New Workspace
            </StNewButton> 
            <CreatePopup
                isOpen={createState != 'closed'}
                data={createData}
                onChange={createChange}
                string={createPopupStr}
            />
        </>
    );
};

const StNewButton = styled.button`
    display: block;
    margin: 15px auto;
    height: 50px;
    width: 250px;
    background-color: #D3D3D3;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    color: #505050;
    &:hover {
        color: #ffffff;
    }
`;