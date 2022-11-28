//import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import CustomLink from "./Link";
import Modal from "../components/Modal";

const ButtonTL = styled.div`
  grid-area: tLButton;
  background-color: #e1e1e1;
  //background-color: lightgrey;
  padding: 1rem;
  font-family: "CorporateGothic", sans-serif;
  //font-family: sans-serif;
  //font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  justify-self: self-start;
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
  justify-self: self-end;
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
  justify-self: self-start;
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
  justify-self: self-end;
  //@media only screen
`;

const NavButtons: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ButtonTL>
        <CustomLink to="/">Home</CustomLink>
      </ButtonTL>
      <ButtonTR>
        <CustomLink to="/about">About</CustomLink>
      </ButtonTR>
      <ButtonBL /* onClick={() => setShowModal(true)} */>
        {/* <Modal onClose={() => setShowModal(false)} show={showModal}>
          Hello frm modal
        </Modal> */}
        <CustomLink to="/music">Music</CustomLink>
      </ButtonBL>
      <ButtonBR>
        <CustomLink to="/socials">Socials</CustomLink>
      </ButtonBR>
    </>
  );
};

export default NavButtons;
