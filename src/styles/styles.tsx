import styled, { createGlobalStyle, css } from "styled-components";
import { mediaQueriesMax, mediaQueriesMin } from "./mediaQueries";
//import { devices } from "./breakpoints";

export const GlobalStyle = createGlobalStyle`

html,
    body {
        //padding: 0;
        margin: 0 auto;
        overflow: hidden;
        //max-width: 1440px;
        height: 100vh;

  @font-face {
    font-family: "Boom4Real";
    src: local("Boom4Real"), local("Boom4Real"),
    url("/assets/fonts/Boom4Real.woff") format("woff"),
    url("/assets/fonts/Boom4Real.ttf") format("truetype");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: "CorporateGothic";
    src: local("CorporateGothic"),
    url("/assets/fonts/CorporateGothicRegular.ttf") format("truetype"),
    url("/assets/fonts/CorporateGothicRegularWoff.woff") format("woff");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: "Waliny";
    src: local("Waliny"),
    url("/assets/fonts/Waliny.ttf") format("truetype"),
    url("/assets/fonts/WalinyWoff.woff") format("woff");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: "XTypeWriter";
    src: local("XTypeWriter"),
    url("/assets/fonts/XTypewriterTTF.ttf") format("truetype"),
    url("/assets/fonts/XTypewriter-Regular-1964.woff") format("woff"), url("/assets/fonts/XTypewriter-Regular-e6c3.woff2") format("woff2");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
}


    }
`;

export const AppContainer = styled.div`
  display: grid;
  //padding: 0.25%;
  height: 100vh;
  place-items: center;
  grid-template-columns: minmax(10px, 10%) 1fr minmax(10px, 10%);
  grid-template-rows: minmax(10px, 15%) 2fr minmax(10px, 15%) 5%;
  grid-template-areas:
    "tLButton . tRButton"
    ". canvas ."
    "bLButton aBText bRButton"
    "footer footer footer";
  /* 
  ${mediaQueriesMax("mobileS")`
  //mostly affects buttons
      padding-right: 5%;
      padding-left: 2.5%;
    `}; */

  ${mediaQueriesMax("mobileL")`
        grid-template-columns: minmax(10px,20%) 1fr minmax(10px,20%);
    `}
`;

export const Canvas = styled.canvas`
  grid-area: canvas;
`;

export const MainDiv = styled.div`
  grid-area: canvas;
`;

export const Footer = styled.footer`
  grid-area: footer;
  border-top: 1px solid #e1e1e1;
  place-self: stretch;
`;

export const FooterText = styled.p`
  display: flex;
  justify-content: right;
  padding-right: 0.5rem;
  /* position: absolute;
  left: 50%; */
  font-family: "Boom4Real";
`;
