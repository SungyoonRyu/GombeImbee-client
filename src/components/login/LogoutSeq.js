import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoginState, nodeData, linkData, groupData, workspaceData } from "../../utils/atom";

export default function LogoutSeq() {
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
        <StLogout onClick={logout}>Log out</StLogout>
    );
}

const StLogout = styled.button`
    margin: auto;
    display: block;
    width: 100px;
    background-color: white;
    border: dotted 1px;
    &:hover {
        background-color: darkgray;
        color: white;
    }
`;