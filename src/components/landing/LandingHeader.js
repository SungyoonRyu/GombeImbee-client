import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LandingHeader() {
    const navigate = useNavigate();

    return (
        <StLandingHeader>
            LandingHeader
            <StButton onClick={() => navigate("/login")}>로그인</StButton>
            <StButton onClick={() => navigate("/signup")}>회원가입</StButton>
        </StLandingHeader>
    );
}

const StLandingHeader = styled.div`
    
`;

const StButton = styled.button`
    
`;