import axios from "axios";

import config from "../../utils/config.json";
import def from "../login/LoginDef.json";

const loginReq = (event, id, pw) => {
    event.preventDefault();
    return {state: true, id: id};

    event.preventDefault();
    if (!id) return def.ERROR.VALUE_NULL_ID;          
    else if (!pw) return def.ERROR.VALUE_NULL_PASSWD;

    let reqData = {id: id, pw: pw};
    axios.post(config.ip+config.port+'/usr/signin', reqData)
        .then(res => {
            if (res.status == 200) return {state: true, id: res.data.id};
            return {state: false, error: def.ERROR.UNKNOWN};
        })
        .catch(error => {
            let state = error.response.state;
            if      (state == 400) return {state: false, error: def.ERROR.VALUE_NULL};
            else if (state == 401) return {state: false, error: def.ERROR.INVALID_ID};
            else if (state == 402) return {state: false, error: def.ERROR.INVALID_PASSWD};
            else                   return {state: false, error: def.ERROR.UNKNOWN};
        })
}

export default loginReq;