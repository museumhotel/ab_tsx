import { FC } from "react";
import {
  ContainerProps,
  ContentContainer,
} from "../components/ContentContainer";
import { Layout } from "../components/Layout";

const Music: FC<ContainerProps> = ({ music, children, ...props }) => {
  return (
    <>
      <Layout>
        <ContentContainer music="true"></ContentContainer>
      </Layout>
    </>
  );
};

export default Music;
