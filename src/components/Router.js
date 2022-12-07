import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Landing, Login, Main, Signup } from "../pages";

import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/atom";


export default function Router() {
    const login = useRecoilValue(isLoginState);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={login.state ? <Main/> : <Login/>} />
                <Route path="/login" element={login.state ? <Main/> : <Login/>} />
                <Route path="/main" element={login.state ? <Main/> : <Login/>} />
                <Route path="/signup" element={login.state ? <Main/> : <Signup/>} />
            </Routes>
        </BrowserRouter>
    );
}