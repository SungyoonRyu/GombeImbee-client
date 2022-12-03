import styled from "styled-components";

import { LoginForm } from "../components/login";

export default function Login() {
    return (
        <StLoginCont>
            <StLoginBox>
                <LoginForm />
            </StLoginBox>
        </StLoginCont>
    );
}

const StLoginCont = styled.div`
    margin: auto;

    height: 100%;
    width: 80%;
`;

const StLoginBox = styled.div`
    margin: 150px auto;
    height: 600px;
    width: 900px;
    background-color: #F4F5F7;
    boarder-radius: 10px 10px;
`;