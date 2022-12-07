import { useState } from "react";

import axios from "axios";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodeData, workspaceState } from "../../utils/atom";

import { config } from "../../definitions";
import { BookmarkPopup } from "../view";

export default function AddBookmark(props) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');

    const currentWorkspace = useRecoilValue(workspaceState);
    const setNodeData = useSetRecoilState(nodeData);

    const addNode = async () => {
        try {
            let server = config.ip + config.port;
            let params = {title: title, url: url, tag: tag, description: description, group_id: props.group_id}
            const res = await axios.get(server+'/bookmark/add', {params: params});
            if (res.status == 200) {
                props.setAddState('completed');

                params = {id: currentWorkspace.id}
                const nodeRes = await axios.get(server+'/workspace/get_node', {params: params});
                setNodeData(nodeRes.data);
            }
            else console.log(res.status);
        }
        catch (error) { console.log(error); }
    }

    const addHandler = (event, next) => {
        event.preventDefault();
        if (props.addState == 'input') {
            if (!next) {
                setTitle('');
                setUrl('');
                setTag('');
                setDescription('');
                props.setAddState('closed');
            }
            else addNode();
        }
        else if (props.addState == 'completed') {
            setTitle('');
            setUrl('');
            setTag('');
            setDescription('');
            props.setAddState('closed');
        }
    }

    const addBookmarkStr = {
        title: "북마크 추가하기",
        label: "Workspace: ",
        type: "Bookmark"
    }

    const addBookmarkData = {
        workspace: currentWorkspace.title,
        name: title,
        state: props.addState
    }

    const addInput = (event, type) => {
        switch (type) {
            case 'title': return setTitle(event.target.value);
            case 'url': return setUrl(event.target.value);
            case 'tag': return setTag(event.target.value);
            case 'info': return setDescription(event.target.value);
        }
    }

    return (
        <>
            <BookmarkPopup
                isOpen={props.addState != 'closed'}
                string={addBookmarkStr}
                data={addBookmarkData}
                handler={addHandler}
                input={addInput}
            />
        </>
    );
}