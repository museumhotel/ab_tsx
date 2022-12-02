import { FC } from "react";
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
  return (
    <>
      <ABTextDiv>
        <ASynonym>Art</ASynonym>
        <BSynonym>Boyz.</BSynonym>
      </ABTextDiv>
    </>
  );
};
