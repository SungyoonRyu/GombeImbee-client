import axios from "axios";

import config from "../../utils/config.json";

import linkData from "./link.json";

const linkReq = (workspace) => {
    return linkData;

    if (!workspace) return null;

    let reqData = {workspace: workspace};
    axios.post(config.ip+config.port+'/', reqData)
        .then(res => {
            if (res.status == 200) return res.data;
            return null;
        })
        .catch(error => { return null; })
};

export default linkReq;