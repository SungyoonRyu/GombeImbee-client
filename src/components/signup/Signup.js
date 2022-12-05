import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import signupReq from "../request/SignupReq";

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState();

    const [name, setName] = useState();
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const [pwVerify, setPwVerify] = useState();
    const [email, setEmail] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (msg) {
            setModal(true);
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 1500);
        }
    }, [msg]);

    const signup = (event) => {
        setLoading(true);
        let result = signupReq(event, name, id, pw, pwVerify, email);
        if (result.state) navigate("/");
        else setMsg(result.error);
    }

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeId = (event) => {
        setId(event.target.value);
    }

    const onChangePw = (event) => {
        setPw(event.target.value);
    }

    const onChangePwVerify = (event) => {
        setPwVerify(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onClosePopup = (event) => {
        setModal(false);
    }

    const onChange = {
        name: onChangeName,
        id: onChangeId,
        pw: onChangePw,
        pwVerify: onChangePwVerify,
        email: onChangeEmail,
        popup: onClosePopup
    }

    const data = {
        modal: modal,
        message: msg
    }

    return (
        <>
            <SignupForm
                signup={signup}
                data={data}
                onChange={onChange}
            />
        </>
    );
}