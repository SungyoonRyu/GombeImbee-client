import axios from "axios";

import { loginDef, config } from "../../definitions";

const loginReq = (event, id, pw) => {
    event.preventDefault();
    return {state: true, id: 'qwer'};

    event.preventDefault();
    if (!id) return loginDef.ERROR.VALUE_NULL_ID;          
    else if (!pw) return loginDef.ERROR.VALUE_NULL_PASSWD;

    let reqData = {id: id, pw: pw};
    axios.post(config.ip+config.port+'/usr/signin', reqData)
        .then(res => {
            if (res.status == 200) return {state: true, id: res.data.id};
            return {state: false, error: loginDef.ERROR.UNKNOWN};
        })
        .catch(error => {
            let state = error.response.state;
            if      (state == 400) return {state: false, error: loginDef.ERROR.VALUE_NULL};
            else if (state == 401) return {state: false, error: loginDef.ERROR.INVALID_ID};
            else if (state == 402) return {state: false, error: loginDef.ERROR.INVALID_PASSWD};
            else                   return {state: false, error: loginDef.ERROR.UNKNOWN};
        })
}

export default loginReq;