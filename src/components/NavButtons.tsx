//import Link from "next/link";
import styled from "styled-components";
import CustomLink from "./Link";

const ButtonTL = styled.div`
  grid-area: tLButton;
  background-color: #e1e1e1;
  //background-color: lightgrey;
  padding: 1rem;
  font-family: "CorporateGothic", sans-serif;
  //font-family: sans-serif;
  //font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
`;
const ButtonTR = styled.div`
  grid-area: tRButton;
  background-color: #e1e1e1;
  //background-color: lightgrey;
  padding: 1rem;
  font-family: "CorporateGothic", sans-serif;
  //font-family: sans-serif;
  //font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
`;
const ButtonBL = styled.div`
  grid-area: bLButton;
  background-color: #e1e1e1;
  //background-color: lightgrey;
  padding: 1rem;
  font-family: "CorporateGothic", sans-serif;
  //font-family: sans-serif;
  //font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
`;
const ButtonBR = styled.div`
  grid-area: bRButton;
  background-color: #e1e1e1;
  //background-color: lightgrey;
  padding: 1rem;
  font-family: "CorporateGothic", sans-serif;
  //font-family: sans-serif;
  //font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;

  //@media only screen
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
        <CustomLink to="/socials">Socials</CustomLink>
      </ButtonBR>
    </>
  );
};

export default NavButtons;
