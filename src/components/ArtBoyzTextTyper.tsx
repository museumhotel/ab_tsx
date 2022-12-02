import { FC, useEffect, useRef } from "react";
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

interface TextTyperProps {
  tag?: string;
  tags?: [HTMLHeadingElement];
}

export const ArtBoyzTextTyper: FC<TextTyperProps> = ({ tags }) => {
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
        <ASynonym ref={ASynTxtRef}>Art</ASynonym>
        <BSynonym ref={BSynTxtRef}>Boyz.</BSynonym>
      </ABTextDiv>
    </>
  );
};
