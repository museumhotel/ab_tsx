import Link from "next/link";
import styled from "styled-components";

const ButtonTL = styled.div`
  grid-area: tLButton;
`;
const ButtonTR = styled.div`
  grid-area: tRButton;
`;
const ButtonBL = styled.div`
  grid-area: bLButton;
`;
const ButtonBR = styled.div`
  grid-area: bRButton;
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
