import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { isLoginState } from "../../utils/atom";

export default function UserPofile() {
    const userInfo = useRecoilValue(isLoginState);
    return (
        <StWrapper>
            <StUserImg>user.img</StUserImg>
            <StUserName>{userInfo.id}</StUserName>
        </StWrapper>
    );
}

const StWrapper = styled.div`
    margin: 20px 0px 20px;
`;

const StUserImg = styled.div`
    margin: auto;
    height: 120px;
    width: 120px;
    border: black solid 1px;
`;

const StUserName = styled.div`
    margin: 10px auto;
    width: 230px;
    text-align: center;
    font-size: 24px;
`;