import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignupForm from "./SignupForm";
import { signupDef, config } from "../../definitions";

export default function SignupSeq() {
    const [status, setStatus] = useState(false);
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

    const signup = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!name) setMsg(signupDef.ERROR.VALUE_NULL_NAME);
        else if (!id) setMsg(signupDef.ERROR.VALUE_NULL_ID);          
        else if (!pw) setMsg(signupDef.ERROR.VALUE_NULL_PASSWD);
        else if (!pwVerify) setMsg(signupDef.ERROR.VALUE_NULL_PASSVER);
        else if (!email) setMsg(signupDef.ERROR.VALUE_NULL_EMAIL);
        else if (pw != pwVerify) setMsg(signupDef.ERROR.INVALID_PASSWD);

        try {
            let reqData = {name: name, id: id, pw: pw, email: email};
            const res = await axios.post(config.ip+config.port+'/usr/signup', reqData)
            if (res.status == 200) {
                setMsg("회원가입 성공");
                setStatus(true);
            }
            else setMsg(signupDef.ERROR.UNKNOWN);
        }
        catch (error) {
            let status = error.response.status;
            if      (status == 400) setMsg(signupDef.ERROR.INVALID_PASSWD);
            else if (status == 401) setMsg(signupDef.ERROR.INVALID_ID);
            else                    setMsg(error.message);
        }
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
        if (status) {
            navigate("/");
        }
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
        message: msg,
        loading: loading
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