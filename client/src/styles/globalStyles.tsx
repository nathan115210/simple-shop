/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';

const globalStyles = css`
    /* Reset Box Model */

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Improve Typography */

    html {
        font-size: 16px;
        line-height: 1.5;
        scroll-behavior: smooth;
    }

    body {
        font-family: "Inter", sans-serif;
        color: #333;
        background-color: #f9f9f9;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    /* Remove default list styles */

    ul, ol {
        list-style: none;
    }

    /* Remove anchor underline but add hover effect */

    a {
        /*text-decoration: none; !**!*/
        color: inherit;
        transition: color 0.2s ease-in-out;
    }

    a:hover {
        color: #00fff7;
    }

    /* Normalize images */

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    /* Remove default button styles */

    button {
        all: unset;
        cursor: pointer;
    }

    /* Remove default form styles */

    input, textarea, select, button {
        font: inherit;
    }

    /* Make sure text inputs and buttons don’t break layout */

    input, button, textarea, select {
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        outline: 2px solid #000000
    }

    /* Smooth scrolling for focusable elements */

    :focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
    }

    /* Add consistent spacing to headings */

    h1, h2, h3, h4, h5, h6 {
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 0.5rem;
    }

    /* Make sure code elements are readable */

    code {
        font-family: "Source Code Pro", monospace;
        background-color: rgba(27, 31, 35, 0.05);
        padding: 0.2em 0.4em;
        border-radius: 4px;
    }
`;

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
