import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalSyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
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