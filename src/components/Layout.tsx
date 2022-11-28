import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { AppContainer, Footer, FooterText } from "../styles/styles";
import AnimatedCanvas from "./AnimatedCanvas";
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
        {/* {router.pathname == indexPath ? (
          <AnimatedCanvas
            width={size.width}
            height={size.height}
          ></AnimatedCanvas>
        ) : null} */}
        {children}

        {/*         {router.pathname === "/about" ? <MainDiv>We dem boyz</MainDiv> : null}
         */}
        <Footer>
          <FooterText>2022</FooterText>
        </Footer>
      </AppContainer>
    </>
  );
};
