import { atom } from "recoil";

export const isLoginState = atom({
    key: "isLoginState",
    default: {
        id: "",
        state: false
    }
});

export const bookmarkData = atom({
    key: "bookmarkData",
    default: {}
})