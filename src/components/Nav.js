import React from "react";
import { Link } from "@reach/router";

import styled from "styled-components/macro";
import { theme, mixins } from "../styles";
const { colors } = theme;

const Container = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: row;
  min-height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: ${colors.navBlack};
  text-align: center;
  z-index: 99;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
`;
const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 14px;
  width: 20vw;
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    &:hover,
    &:focus,
    &.active {
      color: ${colors.pink};
      background-color: ${colors.black};
      border-bottom: 5px solid ${colors.pink};
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`;

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: "active" } : null;

const NavLink = (props) => <Link getProps={isActive} {...props} />;

const Nav = () => (
  <Container>
    <Menu>
      <MenuItem>
        <NavLink to="tracks">
          <div>Top Tracks</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="recent">
          <div>Recent</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="playlists">
          <div>Playlists</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/">
          <div>Profile</div>
        </NavLink>
      </MenuItem>
    </Menu>
  </Container>
);

export default Nav;
