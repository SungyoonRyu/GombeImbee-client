import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import config from "../../utils/config.json";

export default function SignupForm() {
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const [pwVerify, setPwVerify] = useState();
    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    const signup = (ele) => {
        ele.preventDefault();
        if (!name) return alert("이름을 입력하세요.");
        else if (!id) return alert("ID를 입력하세요.");          
        else if (!pw) return alert("Password를 입력하세요.");
        else if (!pwVerify) return alert("비밀번호 확인을 입력하세요.");
        else if (!email) return alert("이메일을 입력하세요.");
        else if (pw != pwVerify) return alert("비밀번호가 일치하지 않습니다.");

        let signupData = {name: name, id: id, pw: pw, email: email};
        axios.post(config.ip+config.port+'/usr/signup', signupData)
            .then((res) => {
                if (res.status == 200) {
                    alert("가입성공!");
                    navigate("/");
                }
                else if (res.status == 400) setMsg("모든 정보를 기입하여 주시기 바랍니다.");
                else if (res.status == 401) setMsg("이미 존재하는 Id 입니다.");
            });        
    }

    return (
        <StForm onSubmit={signup}>
            <StLabel>User name</StLabel>
            <StInput onChange={(e)=>setName(e.target.value)}/>
            <StLabel>User ID</StLabel>
            <StInput onChange={(e)=>setId(e.target.value)}/>
            <StLabel>Password</StLabel>
            <StInput type="password" onChange={(e)=>setPw(e.target.value)}/>
            <StLabel>Password check</StLabel>
            <StInput type="password" onChange={(e)=>setPwVerify(e.target.value)}/>
            <StLabel>User Emain</StLabel>
            <StInput onChange={(e)=>setEmail(e.target.value)}/>

            <StButton>Signup</StButton>

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