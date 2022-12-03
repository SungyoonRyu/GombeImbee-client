import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalSyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        margin: 0px;
    }

    html {
        height: 100%;
        font-family: sans-serif;
    }

    input {

    }

    textarea {
        border: none;
        background-color: transparent;
        resize: none;
        outline: none;
    }

    button {
        padding: 0;
        cursor: pointer;
    }
`;