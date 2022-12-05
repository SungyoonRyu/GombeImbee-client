import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { isLoginState, nodeData, linkData, groupData, workspaceData } from "../../utils/atom";

import { groupReq, linkReq, loginReq, nodeReq, workspaceReq } from "../request";

import LoginForm from "./LoginForm";

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

    const login = (event) => {
        setLoading(true);
        let result = loginReq(event, id, pw);
        if (result.state) {
            setLoginState(result);
            setNodeData(nodeReq());
            setLinkData(linkReq());
            setGroupData(groupReq());
            setWorkspaceData(workspaceReq());
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