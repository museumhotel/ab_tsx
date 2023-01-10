import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { type } from "os";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled, {
  AnyStyledComponent,
  css,
  keyframes,
  StyledComponentInnerAttrs,
} from "styled-components";

const ABTextDiv = styled.div`
  grid-area: aBText;
  font-family: "Boom4Real";
  font-size: 1em;
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

type Props = {
  element: keyof typeof ElementMap;
  //styles?: React.CSSProperties
  children?: React.ReactNode;
  lineOne?: boolean;
  nextCharProbability?: number;
  typingDuration?: number;
  displayCaret?: boolean;
  caretBlinkingSpeed?: number;
  glitchProbability?: number;
  potentialGlitchInterval?: number;
};
const lineOneMarginBottom = `2.5rem`;
const caretCSS = `
    content: "";
    //position: absolute;
    left: 10em;
    height: 1.25em;
    border-right: 0.25em solid red;

    animation: blink 1000ms linear infinite;
    @keyframes blink{
        0% {opacity: 1;}
        25% {opacity: 0;}
        75% {opacity: 1;}
    }
  `;
const blinking = keyframes`
    0% {
        opacity: 1;
    }
    25% {
        opacity: 0;
    }
    75% {
        opacity: 1;
    }
  `;
/* const BlinkingMixin = css<Props>`
  //animation: ${blinking} ${(props) =>
    props.caretBlinkingSpeed}ms linear infinite;
`; */

const RenderedText = styled.p<Props>`
  grid-area: aBText;
  font-family: "Boom4Real";
  font-size: 1em;
  justify-self: left;
  margin-bottom: ${(props) => (props.lineOne ? lineOneMarginBottom : 0)};
  //display: inline;

  &::after {
    content: "";
    //position: absolute;
    right: -1em;
    height: 1em;
    border-right: 0.25em solid black;

    animation: blink 1000ms linear infinite;
    @keyframes blink {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0;
      }
      75% {
        opacity: 1;
      }
    }
  }
  /*  ${(props) => (props.displayCaret ? caretCSS : 0)} */
`;

const ElementMap = {
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

const possibleStrings: string[] = ["creativity", "genius"];

export const Typography = ({
  element,
  children,
  lineOne = false,
  nextCharProbability = 0.8,
  //nextCharProbability = 0.5,
  typingDuration = 3000,
  displayCaret = false,
  glitchProbability = 0.05,
  potentialGlitchInterval = 200,
}: Props) => {
  const selectedElement = ElementMap[element];

  const text = children as string;
  const [renderedText, setRenderedText] = useState<string | null>(text || "");
  const [sliceIndex, setSliceIndex] = useState(0);
  const [typingIntervalID, setTypingIntervalID] = useState<NodeJS.Timer | null>(
    null
  );

  const [selectedString, setSelectedString] = useState<string | null>(null);

  const possibleCharacters: string =
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890-=!@£$%^&*()_+[]{};:|,./<>?";

  const randomizeTextCharacter = (textToAugment: string) => {
    const charToReplaceIndex = Math.floor(Math.random() * textToAugment.length);
    const randomChar = possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
    const splitText = textToAugment.split("");
    splitText[charToReplaceIndex] = randomChar;
    const newText = splitText.join("");
    return newText;
  };

  const typingInterval = Math.floor(typingDuration / (text?.length || 1));

  useEffect(() => {
    // Select a random string from the array of possible strings
    const randomString =
      possibleStrings[Math.floor(Math.random() * possibleStrings.length)];
    setSelectedString(randomString);
  }, []);

  useEffect(() => {
    const gID = setInterval(() => {
      if (Math.random() > 1 - glitchProbability) {
        setRenderedText(randomizeTextCharacter(text!));
      } else {
        if (renderedText !== text) {
          setRenderedText(text);
        }
      }
    }, potentialGlitchInterval);
    //original interval
    const tID = setInterval(() => {
      //setSliceIndex((index) => index! + 1);
      if (Math.random() > 1 - nextCharProbability) {
        setSliceIndex((index) => index! + 1);
      }
      //}, 150);
    }, typingInterval);
    setTypingIntervalID(tID);

    return () => {
      //clearInterval(typingInterval);
      clearInterval(gID);
      clearInterval(tID);
    };
  }, []);

  useEffect(() => {
    if (sliceIndex! >= text!.length) {
      clearInterval(typingIntervalID!);
    }
  }, [sliceIndex]);

  return (
    //@ts-ignore
    <RenderedText
      as={selectedElement}
      lineOne={lineOne}
      displayCaret={displayCaret}
    >
      {renderedText!.slice(0, sliceIndex!)}
    </RenderedText>
  );
};
