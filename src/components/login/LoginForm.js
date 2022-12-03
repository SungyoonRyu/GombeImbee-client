import styled from "styled-components";

import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();
    return (
        <StForm>
            <StLabel>User ID</StLabel>
            <StInput placeholder="이메일 입력"/>

            <StLabel>Password</StLabel>
            <StInput placeholder="비밀번호 입력"/>

            <div style={{margin:'60px auto', width:'400px'}}>
                <StButton onClick={() => navigate("/")}>취소</StButton>
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