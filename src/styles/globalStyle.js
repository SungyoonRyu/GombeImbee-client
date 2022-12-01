import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalSyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html {
        height: 100%;
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