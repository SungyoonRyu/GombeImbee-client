import styled from "styled-components";
import { Link } from "react-router-dom";

import { SignupSeq } from "../components/signup";
import logo from "../asset/logo/nodeBook_Logo_white.png"

export default function Signup() {
    return (
        <StSignupCont>
            <StSignupBox>
                <Link to='/'>
                    <StLogo src={logo}/>
                </Link>
                <SignupSeq />
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
    height: 1080px;
    width: 900px;
    background-color: #EAEAEA;
    boarder-radius: 10px 10px;
`;

const StLogo = styled.img`
    display: block;
    margin: 20px auto;
    padding: 40px 0px 0px;
`;