import { type } from "os";
import React, { FC, ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";

const ABTextDiv = styled.div`
  grid-area: aBText;
  font-family: "Boom4Real";
  font-size: 1rem;
  justify-self: left;
  //display: flex;
`;

let ASynonym = styled.h1`
  //display: flex;
`;
let BSynonym = styled.h1`
  //display: flex;
`;

interface TextTyperProps {
  //extends React.ReactHTMLElement<HTMLElement>
  tag?: string;
  children?: React.ReactNode;
  //element?: React.ReactHTMLElement<HTMLElement>;
  element?: React.ElementType;
}

const RenderedText = styled.p`
  grid-area: aBText;
`;

const VariantMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
} as const;

type Props = {
  variant: keyof typeof VariantMap;
  children?: React.ReactNode;
};

export const Typography = ({ variant, children }: Props) => {
  const selectedComponent = VariantMap[variant];

  return <RenderedText as={selectedComponent}>{children}</RenderedText>;
};

type TextProps<C extends React.ElementType> = {
  as?: C;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

export const TypingText = <C extends React.ElementType>({
  as,
  children,
}: {
  as?: C;
  children?: React.ReactNode;
}) => {
  interface AsComponent {
    component?: typeof as | "span";
  }
  const Component = as || "span";
  //const TXTComponent = styled.p``;

  //const Text extends Component =

  return <Component>{children}</Component>;
};

export const ArtBoyzTextTyper: FC<TextTyperProps> = ({ children, element }) => {
  //const inlineTxtRef = useRef<HTMLHeadingElement | null>(null);
  const ASynTxtRef = useRef<HTMLHeadingElement | null>(null);
  const BSynTxtRef = useRef<HTMLHeadingElement | null>(null);

  //let headerTags = inlineTxtRef.current;
  let artSynonym = ASynTxtRef.current;
  let boySynonym = BSynTxtRef.current;

  useEffect(() => {
    return () => {};
  }, []);

  if (artSynonym != null && boySynonym != null) {
    // || headerTags != null
    //console.log(ASynTxtRef);
    //console.log(BSynTxtRef);
    //let artSynonymTxt = artSynonym.innerHTML;
    //let boySynonymTxt = boySynonym.innerHTML;

    //console.log(inlineTxtRef);
    const runRandom = () => {
      const originalStrings = [""];
      originalStrings.push(artSynonym!.innerHTML, boySynonym!.innerHTML);
      console.log(originalStrings);

      artSynonym!.innerHTML = "creative";
      boySynonym!.innerHTML = "lads";
    };

    runRandom();
  }

  return (
    <>
      <ABTextDiv>
        <RenderedText as={element}>{children}</RenderedText>
        {/*  <ASynonym ref={ASynTxtRef}>Art</ASynonym>
        <BSynonym ref={BSynTxtRef}>Boyz.</BSynonym> */}
      </ABTextDiv>
    </>
  );
};
