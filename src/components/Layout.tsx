import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { AppContainer, Footer, FooterText } from "../styles/styles";
import Canvas from "./Canvas";
import NavButtons from "./NavButtons";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  //hold window size in state
  const size = useWindowSize();

  return (
    <>
      <AppContainer>
        <NavButtons />
        <Canvas height={size.height} width={size.width}></Canvas>
        <Footer>
          <FooterText>2022</FooterText>
        </Footer>
      </AppContainer>
    </>
  );
};
