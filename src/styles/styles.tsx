import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
`;

export const AppContainer = styled.div`
  display: grid;
  padding: 1rem;
  place-items: center;
  grid-template-columns: minmax(10px, 25%) 1fr minmax(10px, 25%);
  grid-template-rows: minmax(10px, 15%) 2fr minmax(10px, 15%) 10%;
  grid-template-areas:
    "tLButton . tRButton"
    ". canvas ."
    "bLButton . bRButton"
    "footer footer footer";
`;

export const Footer = styled.footer`
  grid-area: footer;
  border-top: 1px solid #eaeaea;
`;
