import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { isLoginState, nodeData, linkData, groupData, workspaceData } from "../../utils/atom";

export default function Logout() {
    const resetUser = useResetRecoilState(isLoginState);
    const resetNode = useResetRecoilState(nodeData);
    const resetLink = useResetRecoilState(linkData);
    const resetGroup = useResetRecoilState(groupData);
    const resetWorkspace = useResetRecoilState(workspaceData);
    const navigate = useNavigate();

    const logout = () => {
        resetUser();
        resetNode();
        resetLink();
        resetGroup();
        resetWorkspace();
        navigate("/");
    }

    return (
        <>
            <button onClick={logout}>Log out</button>
        </>
    );
}