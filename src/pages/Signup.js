import styled from "styled-components";

import { SignupForm } from "../components/signup";

export default function Signup() {
    return (
        <StSignupCont>
            <StSignupBox>
                <SignupForm />
            </StSignupBox>
        </StSignupCont>
    );
}

const StSignupCont = styled.div`
    margin: auto;

    height: 100%;
    width: 80%;
`;

const StSignupBox = styled.div`
    margin: 150px auto;
    height: 1000px;
    width: 900px;
    background-color: #F4F5F7;
    boarder-radius: 10px 10px;
`;