import React from "react";
import styled from "styled-components/macro";
import { theme, mixins } from "../styles";
const { colors } = theme;

const H1 = styled.h1`
  color: ${colors.pink};
`;

const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 90vh;
`;
const Loader = () => (
  <Container>
    <H1>Please Wait, It's Flying in The Cloud </H1>
  </Container>
);

export default Loader;
