//import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { GlobalStyle } from "../styles/styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
