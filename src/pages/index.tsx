import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { GlobalStyle } from "../styles/styles";
import { Layout } from "../components/Layout";

const Title = styled.h1`
  background-color: silver;
  color: chartreuse;
  text-shadow: white 1px 0 10px;
`;

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>Art Boyz Online</title>
          <meta
            name="description"
            content="Website for the Art Boyz collective"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Layout></Layout>
    </>
  );
};

export default Home;
