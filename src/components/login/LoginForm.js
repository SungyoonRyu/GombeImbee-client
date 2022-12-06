import styled from "styled-components";

import { Alert } from "../view";

export default function LoginForm(props) {
    return (
        <>
            <StForm onSubmit={props.login}>
                <StLabel>User ID</StLabel>
                <StInput
                    placeholder="이메일 입력" 
                    onChange={props.onChange.id}
                />
                <StLabel>Password</StLabel>
                <StInput 
                    type="password" 
                    placeholder="비밀번호 입력" 
                    onChange={props.onChange.pw}
                />
                <StButton type="submit" disabled={props.data.loading}>
                    로그인
                </StButton>
            </StForm>
            <Alert
                isOpen={props.data.isAlert}
                onRequestClose={props.onChange.alert}
                content={props.data.content}
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