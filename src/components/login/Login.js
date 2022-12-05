import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { isLoginState, bookmarkData } from "../../utils/atom";

import loginReq from "../request/LoginReq";

import testData from "../../testData.json";
import LoginForm from "./LoginForm";

export default function Login() {
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const setLoginState = useSetRecoilState(isLoginState);
    const setBookmarkData = useSetRecoilState(bookmarkData);

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
            // reqData = {id: id}
            // axios.get(config.ip+config.port+'/', reqData)
            //     .then(res => {
            //         if (res.status != 200) return;
            //         setBookmarkData(res.data);
            //     })
            setBookmarkData(testData);
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