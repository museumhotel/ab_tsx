import { NextPage } from "next";
import { Main } from "next/document";
import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";
import AnimatedCanvas from "../components/AnimatedCanvas";
import {
  ContainerProps,
  ContentContainer,
} from "../components/ContentContainer";
import { Layout } from "../components/Layout";
import useWindowSize from "../hooks/useWindowSize";
import music from "./music";

/* interface ContainerProps {
  page: string;
  children?: React.ReactNode;
} */

const About: FC<ContainerProps> = ({ about, children, ...props }) => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <ContentContainer about="true"></ContentContainer>
      </Layout>
    </>
  );
};

export default About;
