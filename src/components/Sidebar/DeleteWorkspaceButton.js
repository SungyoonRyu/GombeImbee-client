import styled from "styled-components";

import { useState } from "react";

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { workspaceData, workspaceState, isLoginState } from "../../utils/atom";

import { DeletePopup } from "../view";

export default function DeleteWorkspaceButton(props) {
    const userState = useRecoilValue(isLoginState);
    const setWorkspaceData = useSetRecoilState(workspaceData);
    const currentWorkspace = useRecoilValue(workspaceState);

    const [deleteError, setDeleteError] = useState('');

    const deleteWorkspace = async (event) => {
        try {
            let error, server = config.ip + config.port;
            var params = {workspaceid: props.deleteId};
            const delRes = await axios.post(server+'/workspace/delete', params);
            if (delRes.status == 200) {
                params = {id: userState.id};
                const workspaceRes = await axios.get(server+'/workspace/get_list', {params: params});
                if (workspaceRes.status == 200) {
                    props.setDeleteState('completed');
                    setWorkspaceData(workspaceRes.data);
                    props.changeWorkspace(workspaceRes.data[0]);
                    return;
                }
                else error = workspaceRes.status;
            }
            else error = delRes.status;
            setDeleteError('ERROR: ' + error);
            setDeleteError('failure');
        }
        catch (error) { console.log(error); }
    }

    const deleteHandle = (event, next) => {
        event.preventDefault();
        if (props.deleteState == 'input') {
            if (next) deleteWorkspace(event);
            props.setDeleteState('closed');
        }
        else if (props.deleteState == 'failure')
            props.setDeleteState('input');
        else if (props.deleteState == 'completed')
            props.setDeleteState('closed');
    }

    const deletePopupStr = {
        title: "Workspace 삭제하기",
        label: "해당 Workspace를 삭제하시겠습니까?",
        type: "workspace"
    }

    const deleteData = {
        name: currentWorkspace.title,
        state: props.deleteState
    }

    const deleteChange = {
        click: deleteHandle
    }

    return (
        <>
            <DeletePopup 
                isOpen={props.deleteState != 'closed'}
                data={deleteData}
                onChange={deleteChange}
                string={deletePopupStr}
            />
        </>
    );
};
