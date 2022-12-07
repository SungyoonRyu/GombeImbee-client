import styled from "styled-components";

import { useState } from "react";

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { nodeData, linkData, groupData, workspaceData, workspaceState, isLoginState } from "../../utils/atom";

import CreateWorkspaceButton from "./CreateWorkspaceButton";
import DeleteWorkspaceButton from "./DeleteWorkspaceButton";

export default function WorkspaceList() {
    const userState = useRecoilValue(isLoginState);
    const workspaces = useRecoilValue(workspaceData);
    const [currentWorkspace, setCurrentWorkspace] = useRecoilState(workspaceState);

    const [deleteState, setDeleteState] = useState('closed');
    const [deleteButton, showDeleteButton] = useState(-1);
    const [deleteId, setDeleteId] = useState(-1);

    const setNodeData = useSetRecoilState(nodeData);
    const setLinkData = useSetRecoilState(linkData);
    const setGroupData = useSetRecoilState(groupData);
    
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
        }
        catch (error) { console.log(error); }
    }

    return (
        <StWrapper>
            { workspaces.map(workspace => {
                return (
                    <StWSRow 
                        key={workspace.id} 
                        onClick={e=>changeWorkspace(workspace)}
                        onMouseEnter={e=>{
                            if (userState.id == workspace.own_user_id) 
                                return showDeleteButton(workspace.id)
                        }}
                        onMouseLeave={e=>showDeleteButton(-1)}
                        style={{
                            backgroundColor: currentWorkspace.id == workspace.id ? '#609BF9' : null
                        }}
                    >
                        <StWSname>{workspace.title}</StWSname>
                        { deleteButton == workspace.id ?
                            <StDeleteButton onClick={()=>{setDeleteId(deleteButton); setDeleteState('input')}}>
                                Delete
                            </StDeleteButton>
                        : null}
                    </StWSRow>
                );
            })}

            <DeleteWorkspaceButton
                deleteId={deleteId}
                deleteState={deleteState}
                setDeleteState={setDeleteState}
                changeWorkspace={changeWorkspace}
                deleteButton={deleteButton}
            />
            <CreateWorkspaceButton/>
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
    &:hover{
        background-color: #609BF9;
        color: #ffffff;
    }
`;

const StWSname = styled.p`
    display: inline-block;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 22px;
    vertical-align: middle;
    white-space: nowrap;
    width: 200px;
    height: 35px;
`;

const StDeleteButton = styled.button`
    margin: 0px
    display: inline-block;
    margin: 0px 0px 16px;
    width:40px;
    height: 21px;
    font-size: 11px;
    font-wight: bold;
    background-color: transparent;
    border: #474747 solid 0.2px;
    color: #474747;
    &:hover {
        background-color: white;
        border-color: black;
        color: black;
    }
`;