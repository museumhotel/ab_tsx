import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import styles from "../styles/Home.module.css";
import { Layout } from "../components/Layout";
import AnimatedCanvas from "../components/AnimatedCanvas";
import useWindowSize from "../hooks/useWindowSize";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

const Title = styled.h1`
  background-color: silver;
  color: chartreuse;
  text-shadow: white 1px 0 10px;
`;

interface HomeProps {
  children?: React.ReactNode;
}

const Home: NextPage = () => {
  const size = useWindowSize();
  const router = useRouter();
  let indexPath = "/";

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
      <Layout>
        {router.pathname == indexPath ? (
          <AnimatedCanvas
            width={size.width}
            height={size.height}
          ></AnimatedCanvas>
        ) : null}
      </Layout>
    </>
  );
};

export default Home;
