import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    .App {
        font-family: sans-serif;
        text-align: center;
    }

    body {
        margin: 0;
        padding: 0;
    }

    .App-logo {
        animation: App-logo-spin infinite 20s linear;
        height: 25vmin;
        pointer-events: none;
    }

    .App-header {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
    }

    .App-link {
        color: #61dafb;
    }

    img {
        width: 250px;
        height: 250px;
    }
`;

export default GlobalStyle;