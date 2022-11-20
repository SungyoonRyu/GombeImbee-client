import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const navigate = useNavigate();
    return (
        <form>
            <label>이름</label>
            <label>이메일</label>
            <label>비밀번호</label>

            <button onClick={() => navigate("/")}>취소</button>
        </form>
    );
}