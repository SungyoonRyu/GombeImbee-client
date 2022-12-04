import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { Popup } from "../view";
import { isLoginState } from "../../utils/atom";

import config from "../../utils/config.json";
import def from "./LoginDef.json"

export default function LoginForm() {
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const [loginState, setLoginState] = useRecoilState(isLoginState);

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

    const cancel = () => {
        navigate("/");
    }

    const login = (event) => {
        event.preventDefault();
        if (!id) return setMsg(def.ERROR.VALUE_NULL_ID);          
        else if (!pw) return setMsg(def.ERROR.VALUE_NULL_PASSWD);

        let loginData = {id: id, pw: pw};
        axios.post(config.ip+config.port+'/usr/signin', loginData)
            .then(res => {
                if (res.status == 200) {
                    setMsg("Login 성공!");
                    setLoginState({id: res.data.id, state: true});
                    navigate("/main");
                }
            })
            .catch(error => {
                console.log(error);
                let status = error.response.status;
                if      (status == 400) setMsg(def.ERROR.VALUE_NULL);
                else if (status == 401) setMsg(def.ERROR.INVALID_ID);
                else if (status == 402) setMsg(def.ERROR.INVALID_PASSWD);
                else                    setMsg(def.ERROR.UNKNOWN);
            })
        setLoading(true);
    }

    return (
        <>
            <StForm onSubmit={login}>
                <StLabel>User ID</StLabel>
                <StInput
                    placeholder="이메일 입력" 
                    onChange={(e)=>setId(e.target.value)}
                />
                <StLabel>Password</StLabel>
                <StInput 
                    type="password" 
                    placeholder="비밀번호 입력" 
                    onChange={(e)=>setPw(e.target.value)}
                />
                <div style={{margin:'60px auto', width:'400px'}}>
                    <StButton type="submit" disabled={loading}>로그인</StButton>
                </div>
                <div style={{margin:'60px auto', width:'400px'}}>
                    <StButton disabled={loading} onClick={()=>cancel()}>취소</StButton>
                </div>
            </StForm>
            <Popup
                isOpen={modal}
                onRequestClose={()=>setModal(false)}
                content={msg}
            />
        </>
    );
}

const StForm = styled.form`
    margin: auto;
    padding: 40px 0px;
    width: 600px;
`;

const StLabel = styled.label`
    display: block;
    margin: 50px auto 10px;
    width: 500px;
    font-size: 18px;
`;

const StInput = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    width: 500px;
    background-color: #EBECEF;
    border-style: none;
`;

const StButton = styled.button`
    display: block;
    margin: 60px auto;
    height: 50px;
    width: 110px;
    background-color: #2F76E6;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`;

const StModal = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
`;