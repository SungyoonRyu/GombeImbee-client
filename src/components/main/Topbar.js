import styled from "styled-components";

import { AddMember, EditMember } from "../topbar";

export default function Topbar(props) {
    

    return (
        <>
            <div>
                <AddMember/>
                <EditMember/>
            </div>
            <div>
                <StChangeButton onClick={props.changeView}> change view </StChangeButton>
            </div>
        </>
    );
};

const StChangeButton = styled.div`
    display: inline-block;
    margin: 5px auto 5px 10px;
    height: 40px;
    width: 130px;
    padding: 13px;
    background-color: black;
    color: white;
    border-radius: 11px;
    text-align: center;
    font-family: sans-serif;
    &:hover {
        background-color: gray;
    }
`;