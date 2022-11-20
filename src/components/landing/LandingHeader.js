import { useNavigate } from "react-router-dom";

export default function LandingHeader() {
    const navigate = useNavigate();

    return (
        <>
            LandingHeader
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
        </>
    );
}