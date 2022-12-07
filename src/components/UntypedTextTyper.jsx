import styled from "styled-components";

const RenderedText = styled.p`
  ${(props) => props.styling}
`;

export const TypingText = (props) => {
  const { children, element, styling } = props;

  return (
    <RenderedText as={element} styling={styling}>
      {children}
    </RenderedText>
  );
};
