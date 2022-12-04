import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Landing, Login, Main, Signup } from "../pages";

import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/atom";


export default function Router() {
    const login = useRecoilValue(isLoginState);
    console.log(login);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={login.state ? <Main/> : <Landing/>} />
                <Route path="/login" element={login.state ? <Main/> : <Login/>} />
                <Route path="/main" element={login.state ? <Main/> : <Login/>} />
                <Route path="/signup" element={login.state ? <Main/> : <Signup/>} />
            </Routes>
        </BrowserRouter>
    );
}