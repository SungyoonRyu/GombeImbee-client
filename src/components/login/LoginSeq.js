import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { isLoginState, nodeData, linkData, groupData, workspaceData, workspaceState } from "../../utils/atom";

import axios from "axios";
import { config } from "../../definitions";

import LoginForm from "./LoginForm";
import loginReq from "../request/LoginReq";

export default function LoginSeq() {
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const setLoginState = useSetRecoilState(isLoginState);
    const setNodeData = useSetRecoilState(nodeData);
    const setLinkData = useSetRecoilState(linkData);
    const setGroupData = useSetRecoilState(groupData);
    const setWorkspaceData = useSetRecoilState(workspaceData);
    const setWorkspaceState = useSetRecoilState(workspaceState);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (msg) {
            setModal(true);
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 1500);
        }
    }, [msg]);

    const login = async (event) => {
        setLoading(true);
        let result = loginReq(event, id, pw);
        if (result.state) {
            setLoginState(result);

            try {
                var params = {id: result.id};
                const workspaceRes = await axios.get(config.ip+config.port+'/workspace/get_list', {params: params});
                if (workspaceRes.status == 200) {
                    let initialWorkspace = workspaceRes.data[0]
                    setWorkspaceData(workspaceRes.data);
                    setWorkspaceState(initialWorkspace);

                    try {
                        params = {id: initialWorkspace.id}
                        const groupRes = await axios.get(config.ip+config.port+'/group/get_list', {params: params});
                        setGroupData(groupRes.data);

                        params = {id: initialWorkspace.id}
                        const nodeRes = await axios.get(config.ip+config.port+'/workspace/get_node', {params: params});
                        setNodeData(nodeRes.data);
                    }
                    catch (error) { console.log(error); }
                }
            }
            catch (error) { console.log(error); }
            navigate("/main");
        }
        else {
            setMsg(result);
        }
    }

    const onChangeId = (event) => {
        setId(event.target.value);
    }

    const onChangePw = (event) => {
        setPw(event.target.value);
    }

    const onClosePopup = (event) => {
        setModal(false);
    }

    const onChange = {
        id: onChangeId,
        pw: onChangePw,
        popup: onClosePopup
    }

    const data = {
        loading: loading,
        popupOpen: modal,
        message: msg
    }

    return (
        <>
            <LoginForm 
                login={login}
                data={data}
                onChange={onChange}
            />
        </>
    );
}