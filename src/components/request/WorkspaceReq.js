import axios from "axios";

import { config } from "../../definitions";

import workspaceData from "./workspace.json";

const workspaceReq = (workspace) => {
    return workspaceData;

    if (!workspace) return null;

    let reqData = {workspace: workspace};
    axios.post(config.ip+config.port+'/', reqData)
        .then(res => {
            if (res.status == 200) return res.data;
            return null;
        })
        .catch(error => { return null; })
};

export default workspaceReq;