import styled from "styled-components"
import UserPofile from "./UserProfile";
import { WorkspaceList } from "../Sidebar";

export default function Sidebar() {
    return (
        <StSidebar>
            <UserPofile />
            <WorkspaceList />
        </StSidebar>
    );
}

const StSidebar = styled.div`
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #FFFFFF;
    overflow-x: hidden;
    transition: 0.5s;
`;