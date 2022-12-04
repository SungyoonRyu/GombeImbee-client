import styled from "styled-components";

export default function WorkspaceList() {
    return (
        <StWrapper>
            <StWSRow>1번</StWSRow>
            <StWSRow>2번</StWSRow>
            <StWSRow>3번</StWSRow>
            <StWSRow>4번</StWSRow>
            <StWSRow>5번testtesttesttesttesttesttesttest</StWSRow>
            <StWSRow>6번</StWSRow>
            <StWSRow>7번</StWSRow>
            <StWSRow>8번</StWSRow>
            <StWSRow>9번</StWSRow>
        </StWrapper>
    );
}

const StWrapper = styled.div`
    margin: 40px 0px;
    padding: 30px 0px 10px;
    border-top: gray solid 1px;
`;

const StWSRow = styled.div`
    margin: 10px 0px;
    padding: 5px 3px 5px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 22px;
    vertical-align: middle;
    text-overflow: ellipsis;
    &:hover{
        background-color: #609BF9;
        color: #ffffff;
    }
`;