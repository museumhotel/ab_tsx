//import Link from "next/link";
//@ts-nocheck
import styled from "styled-components";
import Link from "./Link";

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
        <Link href="/">Home</Link>
      </ButtonTL>
      <ButtonTR>
        <Link href="/about">About</Link>
      </ButtonTR>
      <ButtonBL>
        <Link href="/music">Music</Link>
      </ButtonBL>
      <ButtonBR>
        <Link href="/socials">Social Feed</Link>
      </ButtonBR>
    </>
  );
};

export default NavButtons;
