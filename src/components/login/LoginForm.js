import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import config from "../../utils/config.json";

export default function LoginForm() {
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    const cancel = () => {
        navigate("/");
    }

    const login = (ele) => {
        ele.preventDefault();
        if (!id) return alert("ID를 입력하세요.");          
        else if (!pw) return alert("Password를 입력하세요.");

        let loginData = {id: id, pw: pw};
        axios.post(config.ip+config.port+'/usr/signin', loginData)
            .then(res => {
                if (res.status == 200) {
                    alert("Login 성공!");
                    navigate("/main");
                }
                else if (res.status == 400) setMsg("Id와 Password를 입력해주세요.");
                else if (res.status == 401) setMsg("존재하지 않는 ID 입니다.");
                else if (res.status == 402) setMsg("Password가 틀립니다.");
                else setMsg("UNKNOWN_ERROR");
            })
    }

    return (
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
                <StButton onClick={() => cancel()}>취소</StButton>
            </div>
            <div style={{margin:'60px auto', width:'400px'}}>
                <StButton>로그인</StButton>
            </div>
        </StForm>
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