import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();
    return (
        <form>
            <label>이메일</label>
            <input placeholder="이메일 입력"/>

            <label>비밀번호</label>
            <input placeholder="비밀번호 입력"/>

            <button onClick={() => navigate("/")}>취소</button>
        </form>
    );
}