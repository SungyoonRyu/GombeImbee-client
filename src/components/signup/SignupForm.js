import styled from "styled-components";

import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const navigate = useNavigate();
    return (
        <StForm>
            <StLabel>User name</StLabel>
            <StInput />
            <StLabel>User ID</StLabel>
            <StInput />
            <StLabel>Password</StLabel>
            <StInput />
            <StLabel>Password check</StLabel>
            <StInput />
            <StLabel>User Emain</StLabel>
            <StInput />

            <StButton onClick={() => navigate("/")}>Signup</StButton>

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