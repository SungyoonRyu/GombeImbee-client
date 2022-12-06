import { useState } from "react";

import axios from "axios";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodeData, workspaceState } from "../../utils/atom";

import { config } from "../../definitions";
import { DeletePopup } from "../view";

export default function DeleteBookmark(props) {
    const [delState, setDelState] = useState('closed');

    const currentWorkspace = useRecoilValue(workspaceState);
    const setNodeData = useSetRecoilState(nodeData);

    const deleteNode = async (event) => {
        try {
            let server = config.ip + config.port;
            let params = {id: props.node.id}
            const res = await axios.get(server+'/bookmark/del', {params: params});
            if (res.status == 200) {
                setDelState('completed');

                params = {id: currentWorkspace.id}
                const nodeRes = await axios.get(server+'/workspace/get_node', {params: params});
                setNodeData(nodeRes.data);
            }
            else console.log(res.status);
        }
        catch (error) { console.log(error); }
    }
    
    const delHandler = (event, next) => {
        event.preventDefault();
        if (delState == 'input') {
            if (next) deleteNode(event);
            setDelState('closed');
        }
        else if (delState == 'failure')
            setDelState('input');
        else if (delState == 'completed')
            setDelState('closed');
    }

    const delBookmarkStr = {
        title: "북마크 삭제하기",
        type: "Bookmark",
        complete: "북마크가 삭제되었습니다."
    }

    const delBookmarkData = {
        workspace: currentWorkspace.title,
        name: props.node.title,
        state: delState
    }    

    const onChange = {
        click: delHandler
    }

    return (
        <>
            <button onClick={()=>setDelState('input')}>
                삭제
            </button>
            <DeletePopup
                isOpen={delState != 'closed'}
                string={delBookmarkStr}
                data={delBookmarkData}
                onChange={onChange}
            />
        </>
    );
}