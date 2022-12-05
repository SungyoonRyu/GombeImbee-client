import axios from "axios";

import def from "../signup/SignupDef.json";
import config from "../../utils/config.json";

const signupReq = (event, name, id, pw, pwVerify, email) => {
    event.preventDefault();
    if (!name) return {state: false, error: def.ERROR.VALUE_NULL_NAME};
    else if (!id) return {state: false, error: def.ERROR.VALUE_NULL_ID};          
    else if (!pw) return {state: false, error: def.ERROR.VALUE_NULL_PASSWD};
    else if (!pwVerify) return {state: false, error: def.ERROR.VALUE_NULL_PASSVER};
    else if (!email) return {state: false, error: def.ERROR.VALUE_NULL_EMAIL};
    else if (pw != pwVerify) return {state: false, error: def.ERROR.INVALID_PASSWD};

    let reqData = {name: name, id: id, pw: pw, email: email};
    axios.post(config.ip+config.port+'/usr/signup', reqData)
        .then((res) => {
            if (res.status == 200) return {state: true};
            return {state: false, error: def.ERROR.UNKNOWN};
        })
        .catch(error => {
            let status = error.response.status;
            if      (status == 400) return {state: false, error: def.ERROR.INVALID_PASSWD};
            else if (status == 401) return {state: false, error: def.ERROR.INVALID_ID};
            else                    return {state: false, error: error.message};
        })      
}

export default signupReq;