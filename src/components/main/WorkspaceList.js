import styled from "styled-components";

import { useState } from "react";

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { nodeData, linkData, groupData, workspaceData, workspaceState, isLoginState } from "../../utils/atom";

import { CreatePopup } from "../view";

import linkdata from "../request/link.json";

export default function WorkspaceList() {
    const userState = useRecoilValue(isLoginState);
    const [workspaces, setWorkspaceData] = useRecoilState(workspaceData);
    const [currentWorkspace, setCurrentWorkspace] = useRecoilState(workspaceState);

    const setNodeData = useSetRecoilState(nodeData);
    const setLinkData = useSetRecoilState(linkData);
    const setGroupData = useSetRecoilState(groupData);

    const [createState, setCreateState] = useState('closed');
    const [createInput, setCreateInput] = useState("");
    const [createMsg, setCreateMsg] = useState("");
    
    const changeWorkspace = async (workspace) => {
        if (currentWorkspace.title == workspace.title) return;
        setCurrentWorkspace(workspace);

        try {
            let server = config.ip + config.port;
            var params = {id: workspace.id};
            const groupRes = await axios.get(server+'/group/get_list', {params: params});
            setGroupData(groupRes.data);

            params = {id: workspace.id};
            const nodeRes = await axios.get(server+'/workspace/get_node', {params: params});
            setNodeData(nodeRes.data);

            if (workspace.title == "컴퓨터공학") setLinkData(linkdata);
            else setLinkData([]);
        }
        catch (error) { console.log(error); }
    }

    const createWorkspace = async () => {
        // if (createState == 'input') {
        //     // if (createInput.length == 0 || createInput.includes(' ')) {
        //     //     setCreateMsg("Workspace 이름에는 공백이 포함될 수 없습니다.");
        //     //     setCreateState('failure');
        //     //     return;
        //     // }
        // }
        // else {
        //     setCreateInput("");
        //     setCreateState('closed');
        //     return;
        // }

        try {
            let server = config.ip + config.port;
            var params = {id: userState.id, title: createInput};
            const addRes = await axios.post(server+'/workspace/add', params);
            console.log("eidjialwjadelfje");
            
            if (addRes.status == 200) {
                const workspaceRes = await axios.get(server+'/workspace/get_list', {params: params});
                
                if (workspaceRes.status == 200) {
                    setWorkspaceData(workspaceRes.data);
                    setCurrentWorkspace(workspaceRes.data.find((ele)=>ele.title == createInput));
                    
                }
                setCreateState('completed');
            }
        }
        catch (error) { console.log(error); }
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
        createMsg: createMsg,
        createState: createState
    }

    const createChange = {
        click: createWorkspace,
        input: createInputChange
    }

    return (
        <StWrapper>
            { workspaces.map(workspace => {
                return (
                    <StWSRow 
                        key={workspace.id} 
                        onClick={e=>changeWorkspace(workspace)}
                        style={{backgroundColor: currentWorkspace.id == workspace.id ? '#609BF9' : null}}
                    >
                        {workspace.title}
                    </StWSRow>
                );
            })}

            <StButton onClick={()=>setCreateState('input')}>
                New
            </StButton>

            <CreatePopup
                isOpen={createState != 'closed'}
                data={createData}
                onChange={createChange}
                strings={createPopupStr}
            />
        </StWrapper>
    );
}

const StWrapper = styled.div`
    margin: 40px 0px;
    padding: 30px 0px 10px;
    border-top: gray solid 1px;
`;

const StWSRow = styled.div`
    margin: 10px 0px;
    padding: 5px 3px 5px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 22px;
    vertical-align: middle;
    text-overflow: ellipsis;
    &:hover{
        background-color: #609BF9;
        color: #ffffff;
    }
`;

const StButton = styled.button`
    display: block;
    margin: 60px auto;
    height: 50px;
    width: 110px;
    background-color: #2F76E6;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;
