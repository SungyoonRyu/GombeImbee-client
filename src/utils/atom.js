import { atom } from "recoil";

export const isLoginState = atom({
    key: "isLoginState",
    default: {
        id: "",
        state: false
    }
});

export const workspaceState = atom({
    key: "workspaceState",
    default: 0
})

export const nodeData = atom({
    key: "nodeData",
    default: []
});

export const linkData = atom({
    key: "linkData",
    default: []
});

export const groupData = atom({
    key: "groupData",
    default: []
});

export const workspaceData = atom({
    key: "workspaceData",
    default: []
});