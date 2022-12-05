import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { isLoginState, bookmarkData } from "../../utils/atom";

export default function Logout() {
    const resetUser = useResetRecoilState(isLoginState);
    const resetData = useResetRecoilState(bookmarkData);
    const navigate = useNavigate();

    const logout = () => {
        resetUser();
        resetData();
        navigate("/");
    }

    return (
        <>
            <button onClick={logout}>Log out</button>
        </>
    );
}