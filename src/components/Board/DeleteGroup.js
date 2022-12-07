import { useState } from "react";

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupData, workspaceState, isLoginState } from "../../utils/atom";

import { DeletePopup } from "../view";

export default function DeleteGroup(props) {
    const setGroupData = useSetRecoilState(groupData);
    const currentWorkspace = useRecoilValue(workspaceState);

    const deleteGroup = async (event) => {
        try {
            let server = config.ip + config.port;
            var params = {id:props.group.id};
            const delRes = await axios.post(server+'/group/delete', params);
            if (delRes.status == 200) {
                props.setDeleteState('completed');
                params = {id: currentWorkspace.id}
                const res = await axios.get(server+'/group/get_list', {params: params});
                setGroupData(res.data);
            }
        }
        catch (error) { console.log(error); }
    }

    const deleteHandle = (event, next) => {
        event.preventDefault();
        if (props.deleteState == 'input') {
            if (next) deleteGroup(event);
            props.setDeleteState('closed');
        }
        else if (props.deleteState == 'completed') {
            props.setDeleteState('closed');
        }
    }

    const deletePopupStr = {
        title: "Group 삭제하기",
        label: "해당 Group을 삭제하시겠습니까?",
        type: "group"
    }

    const deleteData = {
        name: props.group.title,
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
}