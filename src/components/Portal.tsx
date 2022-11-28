import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface Props {
  children: any;
}

export const Portal0: React.FC<Props> = ({ children }) => {
  const element = document.createElement("div");
  const wrapper: React.RefObject<HTMLElement> = useRef(element);

  useEffect(() => {
    const current = wrapper.current as HTMLElement;
    current.setAttribute("id", "overlay");
    document.body.appendChild(current);

    return () => {
      document.body.removeChild(current);
    };
  }, []);

  if (!wrapper.current) {
    return <>{null}</>;
  }

  return createPortal(children, wrapper.current);
};

interface PortalProps {
  children: ReactNode;
}

const StyledOverlayDiv = styled.div`
  display: block;
  position: fixed;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

export const Portal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#modal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <StyledOverlayDiv>{props.children}</StyledOverlayDiv>,
        ref.current
      )
    : null;
};
