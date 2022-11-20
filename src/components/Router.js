import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Landing, Login, Signup } from "../pages";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}