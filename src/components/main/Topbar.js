import styled from "styled-components";

import { EditMember } from "../topbar";
import { LogoutSeq } from "../login";

export default function Topbar(props) {
    

    return (
        <>
            <EditMember

            />
            <StChangeButton onClick={props.changeView}> change view </StChangeButton>
            <LogoutSeq />
        </>
    );
};

const StChangeButton = styled.div`
    height: 50px;
    width: 100px;
    background-color: #7AC5CA;
    font-family: sans-serif;
    &:hover {
        background-color: #6699FF;
    }
`;