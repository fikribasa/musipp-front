import React from "react";
import styled from "styled-components/macro";
import { theme, mixins, Main } from "../styles";
import img from "../assets/back.jpg";
const { colors, fontSizes } = theme;

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
  }
  background-image: url(${img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.pink};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offPink};
  }
`;

const LoginScreen = () => (
  <Login>
    <h1>Musipp Your Music</h1>
    <LoginButton href="http://localhost:8888/auth">
      Log in to Spotify
    </LoginButton>
  </Login>
);

export default LoginScreen;
