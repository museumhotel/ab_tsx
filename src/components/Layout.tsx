import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { AppContainer } from "../styles/styles";
import NavButtons from "./NavButtons";

interface LayoutProps {
  children?: React.ReactNode;
}
//type LayoutProps<P> = P & { children?: React.ReactNode };

export const Canvas = styled.canvas`
  grid-area: canvas;
`;

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  //hold window size in state
  const size = useWindowSize();

  return (
    <>
      <AppContainer>
        <NavButtons />
      </AppContainer>
    </>
  );
};
