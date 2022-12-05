import axios from "axios";

import config from "../../utils/config.json";

import nodeData from "./node.json";

const nodeReq = (workspace) => {
    return nodeData;

    if (!workspace) return null;

    let reqData = {workspace: workspace};
    axios.post(config.ip+config.port+'/', reqData)
        .then(res => {
            if (res.status == 200) return res.data;
            return null;
        })
        .catch(error => { return null; })
};

export default nodeReq;