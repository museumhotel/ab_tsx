import { FC, useRef } from "react";
import styled from "styled-components";

const ABTextDiv = styled.div`
  grid-area: aBText;
  font-family: "Boom4Real";
  font-size: 0.75rem;
  justify-self: left;
  //display: flex;
`;

let ASynonym = styled.h1`
  //display: flex;
`;
let BSynonym = styled.h1`
  //display: flex;
`;

export const ArtBoyzTextTyper: FC = ({}) => {
  //const inlineTxtRef = useRef<HTMLHeadingElement | null>(null);
  const ASynTxtRef = useRef<HTMLHeadingElement | null>(null);
  const BSynTxtRef = useRef<HTMLHeadingElement | null>(null);

  let artSynonym = ASynTxtRef.current;
  let boySynonym = BSynTxtRef.current;

  if (artSynonym != null && boySynonym != null) {
    console.log(ASynTxtRef);
    console.log(BSynTxtRef);

    let artSynonymTxt = artSynonym.innerHTML;
    let boySynonymTxt = boySynonym.innerHTML;

    artSynonymTxt = "creative";
    boySynonymTxt = "lads";
  }

  return (
    <>
      <ABTextDiv>
        <ASynonym ref={ASynTxtRef}>Art</ASynonym>
        <BSynonym ref={BSynTxtRef}>Boyz.</BSynonym>
      </ABTextDiv>
    </>
  );
};
