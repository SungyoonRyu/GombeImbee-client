import styled from "styled-components";

import { Popup } from "../view";

export default function SignupForm(props) {
    return (
        <>
            <StForm onSubmit={props.signup}>
                <StLabel>User name</StLabel>
                <StInput onChange={props.onChange.name}/>
                <StLabel>User ID</StLabel>
                <StInput onChange={props.onChange.id}/>
                <StLabel>Password</StLabel>
                <StInput type="password" onChange={props.onChange.pw}/>
                <StLabel>Password check</StLabel>
                <StInput type="password" onChange={props.onChange.pwVerify}/>
                <StLabel>User Emain</StLabel>
                <StInput onChange={props.onChange.email}/>

                <StButton type="submit" disabled={props.data.loading}>회원가입</StButton>
            </StForm>

            <Popup 
                isOpen={props.data.modal}
                onRequestClose={props.onChange.popup}
                content={props.data.message}
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