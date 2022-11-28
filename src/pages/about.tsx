import { NextPage } from "next";
import { Main } from "next/document";
import { useRouter } from "next/router";
import styled from "styled-components";
import AnimatedCanvas from "../components/AnimatedCanvas";
import { ContentContainer } from "../components/ContentContainer";
import { Layout } from "../components/Layout";
import useWindowSize from "../hooks/useWindowSize";

const About: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <ContentContainer></ContentContainer>
      </Layout>
    </>
  );
};

export default About;
