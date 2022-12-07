import { useState } from "react";

import axios from "axios";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupData, workspaceState } from "../../utils/atom";

import { config } from "../../definitions";
import { CreatePopup } from "../view";

export default function AddGroup(props) {
    const [title, setTitle] = useState('');

    const currentWorkspace = useRecoilValue(workspaceState);
    const setGroupData = useSetRecoilState(groupData);

    const addGroup = async () => {
        try {
            let server = config.ip + config.port;
            let params = {title: title, workspace_id: currentWorkspace.id}
            const res = await axios.post(server+'/group/add', params);
            if (res.status == 200) {
                props.setAddGroup('completed');

                params = {id: currentWorkspace.id}
                const groupRes = await axios.get(server+'/group/get_list', {params: params});
                setGroupData(groupRes.data);
            }
            else console.log(res.status);
        }
        catch (error) { console.log(error); }
    }

    const addHandler = (event, next) => {
        event.preventDefault();
        if (props.addGroup == 'input') {
            if (!next) {
                setTitle('');
                props.setAddGroup('closed');
            }
            else addGroup();
        }
        else if (props.addGroup == 'completed') {
            setTitle('');
            props.setAddGroup('closed');
        }
    }

    const addGroupInput = (event) => {
        setTitle(event.target.value);
    }

    const addGroupStr = {
        title: "새로운 Group 추가하기",
        label: "Group 이름",
        type: "Group"
    }

    const addGroupData = {
        name: title,
        error: '',
        state: props.addGroup
    }

    const addGroupChange = {
        click: addHandler,
        input: addGroupInput
    }

    return (
        <>
            <CreatePopup
                isOpen={props.addGroup != 'closed'}
                data={addGroupData}
                onChange={addGroupChange}
                string={addGroupStr}
            />
        </>
    )
}