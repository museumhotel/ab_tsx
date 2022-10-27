import { createGlobalStyle } from "styled-components";
//import Boom4RealWoff from "src/fonts/Boom4Real.woff";
//import Boom4RealTtf from "src/fonts/Boom4Real.ttf";

export const LogoFont = createGlobalStyle`
@font-face {
    font-family: "Boom4Real";
    font-style: normal;
    font-weight: 400;
    src: local("Boom4Real"), local("Boom4Real"),
    url("src/fonts/Boom4Real.woff") format("woff"),
    url("src/fonts/Boom4Real.ttf") format("truetype");
}`;
