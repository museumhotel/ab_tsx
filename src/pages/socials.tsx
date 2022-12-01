import { FC } from "react";
import {
  ContainerProps,
  ContentContainer,
} from "../components/ContentContainer";
import { Layout } from "../components/Layout";

const Socials: FC<ContainerProps> = ({ socials, children, ...props }) => {
  return (
    <>
      <Layout>
        <ContentContainer socials="true"></ContentContainer>
      </Layout>
    </>
  );
};

export default Socials;
