import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { Sidebar, Board } from "../components/main";
import { isLoginState } from "../utils/atom";

export default function Main() {
    const navigate = useNavigate();
    const userInfo = useRecoilValue(isLoginState);

    if (!userInfo.state) {
        navigate("/");
    }
    else {
        return (
            <>
                <Sidebar />            
                <Board />
            </>
        );
    }
}