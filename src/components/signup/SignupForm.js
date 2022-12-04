import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Popup } from "../view";

import config from "../../utils/config.json";
import def from "./SignupDef.json";

export default function SignupForm() {
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const [pwVerify, setPwVerify] = useState();
    const [email, setEmail] = useState();

    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

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

    const signup = (ele) => {
        ele.preventDefault();
        if (!name) return setMsg(def.ERROR.VALUE_NULL_NAME);
        else if (!id) return setMsg(def.ERROR.VALUE_NULL_ID);          
        else if (!pw) return setMsg(def.ERROR.VALUE_NULL_PASSWD);
        else if (!pwVerify) return setMsg(def.ERROR.VALUE_NULL_PASSVER);
        else if (!email) return setMsg(def.ERROR.VALUE_NULL_EMAIL);
        else if (pw != pwVerify) return setMsg(def.ERROR.INVALID_PASSWD);

        let signupData = {name: name, id: id, pw: pw, email: email};
        axios.post(config.ip+config.port+'/usr/signup', signupData)
            .then((res) => {
                if (res.status == 200) {
                    alert("가입성공!");
                    navigate("/");
                }
            })
            .catch(error => {
                let status = error.response.status;
                if      (status == 400) setMsg(def.ERROR.INVALID_PASSWD);
                else if (status == 401) setMsg(def.ERROR.INVALID_ID);
            })      
    }

    return (
        <>
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

                <StButton type="submit" disabled={loading}>회원가입</StButton>
                <StButton disabled={loading} onClick={()=>cancel()}>취소</ StButton>

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