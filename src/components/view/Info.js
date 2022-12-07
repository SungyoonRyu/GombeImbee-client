import { useState } from "react";
import styled, { keyframes } from "styled-components"

import { DeleteBookmark } from "../Board";
import cloneDeep from 'lodash/cloneDeep';

import axios from "axios";
import { config } from "../../definitions";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { workspaceState, nodeData } from "../../utils/atom";

export default function InfoView(props) {
    const currentWorkspace = useRecoilValue(workspaceState);
    const setNodeData = useSetRecoilState(nodeData);

    const [edit, setEdit] = useState(false);

    const editNode = (event, type) => {
        let copy = cloneDeep(props.node);
        switch (type) {
            case 'title': copy.title = event.target.value; break;
            case 'info': copy.description = event.target.value; break;
            case 'tag': copy.tag = event.target.value; break;
            case 'url': copy.url = event.target.value; break;
        }
        props.setNode(copy);
    }

    const onClick = async () => {
        if (!edit) return setEdit(!edit);
        try {
            let server = config.ip + config.port;
            var params = {id: props.node.id};
            const res = await axios.get(server+'/bookmark/del', {params: params});

            params = {title: props.node.title, url: props.node.url, tag: props.node.tag, description: props.node.description, group_id: props.node.group_id, link: null}
            const addRes = await axios.get(server+'/bookmark/add', {params: params});

            if (res.status == 200 && addRes.status == 200) {
                params = {id: currentWorkspace.id}
                const getRes = await axios.get(server+'/workspace/get_node', {params: params});
                setNodeData(getRes.data);
                setEdit(!edit);
            }
        }
        catch (error) { console.log(error); }
    }

    if (props.node == null) return null;
    return (
        <StInform slideAct={props.slideAct}>
            <div>Title: 
                { edit ? <input value={props.node.title} onChange={e=>editNode(e, 'title')}/> : props.node.title }
            </div>
            <div>Url:
                { edit ? <input value={props.node.url} onChange={e=>editNode(e, 'url')}/> : props.node.url }
            </div>
            <div>Tag:
                { edit ? <input value={props.node.tag} onChange={e=>editNode(e, 'tag')}/> : props.node.tag }
            </div>
            <div>Info:
                { edit ? <input value={props.node.description} onChange={e=>editNode(e, 'info')}/> : props.node.description }
            </div>
            <div>
                분류: {currentWorkspace.title+' > '+props.node.fgroup_title}
            </div>

            <button onClick={onClick}>Edit</button>

            <DeleteBookmark node={props.node}/>
        </StInform>
    );
}

const slideInLeft = keyframes`
  from {
    left: 100%;
  }
  to {
    left: calc(100% - 700px);
  }
`;

const StInform = styled.div`
  
  top: 100px;
  left: 100%;
  width: 700px;
  height: 100%;
  background-color: white;
`;