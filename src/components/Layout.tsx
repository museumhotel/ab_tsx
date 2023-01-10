import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { AppContainer, Footer, FooterText } from "../styles/styles";
import AnimatedCanvas from "./AnimatedCanvas";
import { Typography } from "./ArtBoyzTextTyper";
//import Canvas from "./Canvas";
import NavButtons from "./NavButtons";
import { Portal } from "./Portal";

interface LayoutProps {
  children?: React.ReactNode;
}

const MainDiv = styled.div`
  grid-area: canvas;
  font-size: 2.5rem;
  z-index: 2;
`;

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  //hold window size in state
  const size = useWindowSize();

  const router = useRouter();
  //console.log(router.pathname);

  let indexPath = "/";

  return (
    <>
      <AppContainer>
        <NavButtons />
        {children}
        {/* <ArtBoyzTextTyper element={"h1"}>Art</ArtBoyzTextTyper>
        <ArtBoyzTextTyper element={"p"}>
          <br />
          <br />
          Boyz.
        </ArtBoyzTextTyper> */}
        {/*         <TypingText as={"h1"}> Art Boyz.</TypingText>
         */}
        {/* <TypingText>Art</TypingText>
        <br />
        <TypingText>Boyz.</TypingText> */}
        <Typography element={"body1"} lineOne={true} /* displayCaret={false} */>
          Art
        </Typography>
        <Typography element={"body1"} lineOne={false} /* displayCaret={true} */>
          Boyz.
        </Typography>
        <Footer>
          <FooterText>2022</FooterText>
        </Footer>
      </AppContainer>
    </>
  );
};
