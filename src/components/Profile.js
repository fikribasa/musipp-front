import React from "react";
import { Router } from "@reach/router";

import ScrollToTop from "./ScrollToTop";
import Nav from "./Nav";
import User from "./User";
import TopTracks from "./TopTracks";
import Playlists from "./Playlists";
import Playlist from "./Playlist";
import Track from "./Track";
import RecentlyPlayed from "./RecentlyPlayed";
import Player from "./Player/Player";
import styled from "styled-components/macro";
import { theme } from "../styles";

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
`;

const Profile = () => (
  <SiteWrapper>
    <Nav />
    <Router primary={false}>
      <ScrollToTop path="/">
        <User path="/" />
        <RecentlyPlayed path="recent" />
        <TopTracks path="tracks" />
        <Playlists path="playlists" />
        <Playlist path="playlists/:playlistId" />
        <Track path="track/:trackId" />
      </ScrollToTop>
    </Router>
    <Player />
  </SiteWrapper>
);

export default Profile;
