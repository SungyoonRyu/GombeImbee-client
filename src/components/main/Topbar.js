import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { workspaceState } from "../../utils/atom";

import { AddMember, EditMember } from "../topbar";

export default function Topbar(props) {
    const currentWorkspace = useRecoilValue(workspaceState);

    return (
        <>
            <div>
                <StWorkspaceName>{currentWorkspace.title}</StWorkspaceName>
                <AddMember/>
                <EditMember/>
            </div>
            <div>
                <StSearchBar onChange={props.onChange}/>
                <StChangeButton onClick={props.changeView}> change view </StChangeButton>
            </div>
        </>
    );
};

const StWorkspaceName = styled.h1`
    display: inline-block;
    margin: 5px auto 5px 20px;
    vertical-align: top;
    width: calc(100% - 340px);
    height: 30px;
    border-radius: 15px;
    background-color: #D3D3D3;
    font-size: 24px;
    text-align: center;
`;

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

const StSearchBar = styled.input`
    display: inline-block;
    margin: 5px auto 5px 20px;
    vertical-align: top;
    width: calc(100% - 340px);
    height: 30px;
    border-radius: 15px;
    background-color: #D3D3D3;
    font-size: 24px;
    text-align: center;
`;