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
      <Layout>
        <div>
          <Head>
            <title>Art Boyz Online</title>
            <meta
              name="description"
              content="Website for the Art Boyz collective"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <Title>
              Welcome to thee <a href="https://nextjs.org">Next.js!</a>
            </Title>

            <p className={styles.description}>
              Get started by editing{" "}
              <code className={styles.code}>pages/index.tsx</code>
            </p>

            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>

              <a
                href="https://github.com/vercel/next.js/tree/canary/examples"
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>
                  Instantly deploy your Next.js site to a public URL with
                  Vercel.
                </p>
              </a>
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </div>
      </Layout>
    </>
  );
};

export default Home;
