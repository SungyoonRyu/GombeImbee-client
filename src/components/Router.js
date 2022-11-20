import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Landing, Login } from "../pages";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}