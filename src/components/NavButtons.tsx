//import Link from "next/link";
import styled from "styled-components";
import CustomLink from "./Link";

const ButtonTL = styled.div`
  grid-area: tLButton;
  background-color: black;
  padding: 1rem;
  font-size: 1rem;
`;
const ButtonTR = styled.div`
  grid-area: tRButton;
  background-color: black;
  padding: 1rem;
  font-size: 1rem;
`;
const ButtonBL = styled.div`
  grid-area: bLButton;
  background-color: black;
  padding: 1rem;
  font-size: 1rem;
`;
const ButtonBR = styled.div`
  grid-area: bRButton;
  background-color: black;
  padding: 1rem;
  font-size: 1rem;
`;

const NavButtons: React.FC = () => {
  return (
    <>
      <ButtonTL>
        <CustomLink to="/">Home</CustomLink>
      </ButtonTL>
      <ButtonTR>
        <CustomLink to="/about">About</CustomLink>
      </ButtonTR>
      <ButtonBL>
        <CustomLink to="/music">Music</CustomLink>
      </ButtonBL>
      <ButtonBR>
        <CustomLink to="/socials">Social Feed</CustomLink>
      </ButtonBR>
    </>
  );
};

export default NavButtons;
