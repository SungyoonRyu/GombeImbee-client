import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSetRecoilState, useRecoilState } from "recoil";
import { isLoginState, nodeData, linkData, groupData, workspaceData, workspaceState } from "../../utils/atom";

import axios from "axios";
import { loginDef, config } from "../../definitions";

import LoginForm from "./LoginForm";

export default function LoginSeq() {
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const [loginState, setLoginState] = useRecoilState(isLoginState);
    const setNodeData = useSetRecoilState(nodeData);
    const setLinkData = useSetRecoilState(linkData);
    const setGroupData = useSetRecoilState(groupData);
    const setWorkspaceData = useSetRecoilState(workspaceData);
    const setWorkspaceState = useSetRecoilState(workspaceState);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (msg) {
            setAlert(true);
        }
    }, [msg]);

    const login = async (event) => {
        event.preventDefault();
        setLoading(true);
        setLoginState({state: true, id: 'qwer'});

        try {
            let server = config.ip + config.port;
            var params = {id: 'qwer'};
            const workspaceRes = await axios.get(server+'/workspace/get_list', {params: params});
            if (workspaceRes.status == 200) {
                let initialWorkspace = workspaceRes.data[0]
                setWorkspaceData(workspaceRes.data);
                setWorkspaceState(initialWorkspace);

                try {
                    params = {id: initialWorkspace.id}
                    const groupRes = await axios.get(server+'/group/get_list', {params: params});
                    setGroupData(groupRes.data);

                    params = {id: initialWorkspace.id}
                    const nodeRes = await axios.get(server+'/workspace/get_node', {params: params});
                    setNodeData(nodeRes.data);
                }
                catch (error) { console.log(error); }
            }
        }
        catch (error) { console.log(error); }
        navigate("/main");

        // event.preventDefault();
        // setLoading(true);
        // if      (!id) return setMsg(loginDef.ERROR.VALUE_NULL_ID);          
        // else if (!pw) return setMsg(loginDef.ERROR.VALUE_NULL_PASSWD);

        // try {
        //     let reqData = {id: id, pw: pw};
        //     const res = await axios.post(config.ip+config.port+'/usr/signin', reqData)
        //     if (res.status == 200) {
        //         setLoginState({state: true, id: res.data.id, name: res.data.name, email: res.data.email, profile_img: res.data.profile_img});  
        //         try {
        //             let server = config.ip + config.port;
        //             var params = {id: res.data.id};
        //             const workspaceRes = await axios.get(server+'/workspace/get_list', {params: params});
        //             if (workspaceRes.status == 200) {
        //                 let initialWorkspace = workspaceRes.data[0]
        //                 setWorkspaceData(workspaceRes.data);
        //                 setWorkspaceState(initialWorkspace);
    
        //                 try {
        //                     params = {id: initialWorkspace.id}
        //                     const groupRes = await axios.get(server+'/group/get_list', {params: params});
        //                     setGroupData(groupRes.data);
    
        //                     params = {id: initialWorkspace.id}
        //                     const nodeRes = await axios.get(server+'/workspace/get_node', {params: params});
        //                     setNodeData(nodeRes.data);
        //                 }
        //                 catch (error) { console.log(error); }
        //             }
        //         }
        //         catch (error) { console.log(error); }
        //         navigate("/main");
        //     }
        //     else {
        //         let state = res.status;
        //         if      (state == 400) setMsg(loginDef.ERROR.VALUE_NULL);
        //         else if (state == 401) setMsg(loginDef.ERROR.INVALID_ID);
        //         else if (state == 402) setMsg(loginDef.ERROR.INVALID_PASSWD);
        //         else                   setMsg(loginDef.ERROR.UNKNOWN);
        //     }
        // }
        // catch (error) { setMsg(loginDef.ERROR.UNKNOWN); }
    }

    const onChangeId = (event) => {
        setId(event.target.value);
    }

    const onChangePw = (event) => {
        setPw(event.target.value);
    }

    const onCloseAlert = (event) => {
        setAlert(false);
        setLoading(false);
        setMsg("");
        if (loginState.state) {
            navigate("/");
        }
    }

    const onChange = {
        id: onChangeId,
        pw: onChangePw,
        alert: onCloseAlert
    }

    const data = {
        loading: loading,
        isAlert: alert,
        content: msg
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