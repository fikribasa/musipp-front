import React, { Component } from "react";
import { Link } from "@reach/router";
import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";

import Loader from "./Loader";

import styled from "styled-components/macro";
import { theme, mixins, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;
const Avatar = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
  }
`;
const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;
const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.white};
  }
`;
const Name = styled.h1`
  color: ${colors.pink};
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stat = styled.div`
  text-align: center;
`;
const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.pink};
  border: 1px solid ${colors.pink};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.pink};
    color: ${colors.black};
  }
`;

class User extends Component {
  state = {
    user: null,
    followedArtists: null,
    playlists: null,
    topArtists: null,
    topTracks: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const {
      user,
      followedArtists,
      playlists,
      topArtists,
      topTracks
    } = await getUserInfo();
    this.setState({ user, followedArtists, playlists, topArtists, topTracks });
  }

  render() {
    const { user, followedArtists, playlists } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <React.Fragment>
        {user ? (
          <Main>
            <Header>
              <Avatar>
                {user.images.length > 0 ? (
                  <img src={user.images[0].url} alt="avatar" />
                ) : (
                  <NoAvatar>
                    <h1>No Profile</h1>
                  </NoAvatar>
                )}
              </Avatar>
              <UserName
                href={user.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Name>{user.display_name}</Name>
              </UserName>
              <Stats>
                <Stat>
                  <Number>{user.followers.total}</Number>
                  <NumLabel>Followers</NumLabel>
                </Stat>
                {followedArtists && (
                  <Stat>
                    <Number>{followedArtists.artists.items.length}</Number>
                    <NumLabel>Following</NumLabel>
                  </Stat>
                )}
                {totalPlaylists && (
                  <Stat>
                    <Link to="playlists">
                      <Number>{totalPlaylists}</Number>
                      <NumLabel>Playlists</NumLabel>
                    </Link>
                  </Stat>
                )}
              </Stats>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </Header>
          </Main>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default User;
