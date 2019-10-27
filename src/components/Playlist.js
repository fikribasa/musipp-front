import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  getPlaylist,
  getAudioFeaturesForTracks,
  playPlaylist
} from "../spotify";
import { catchErrors } from "../utils";

import Loader from "./Loader";
import TrackItem from "./TrackItem";

import styled from "styled-components/macro";
import { theme, mixins, Main } from "../styles";
const { colors, fontSizes } = theme;

const PlaylistContainer = styled.div`
  display: flex;
`;
const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
`;
const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;
`;
const PlaylistCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
const Name = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xl};
  margin-top: 20px;
`;
const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  a {
    color: ${colors.white};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;
const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;
const Owner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;
const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  margin-top: 20px;
`;

class Playlist extends Component {
  static propTypes = {
    playlistId: PropTypes.string
  };

  state = {
    playlist: null,
    tracks: null,
    audioFeatures: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });

    if (data) {
      const { playlist } = this.state;
      const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
      this.setState({ audioFeatures: data });
    }
  }

  async play() {
    const { id } = this.state.playlist;
    await playPlaylist(id);
  }

  render() {
    const { playlist } = this.state;

    return (
      <React.Fragment>
        {playlist ? (
          <Main>
            <PlaylistContainer>
              <Left>
                {playlist.images.length && (
                  <PlaylistCover>
                    <img src={playlist.images[0].url} alt="Album Art" />
                  </PlaylistCover>
                )}

                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Name>{playlist.name}</Name>
                </a>

                <Owner>By {playlist.owner.display_name}</Owner>

                <TotalTracks>{playlist.tracks.total} Tracks</TotalTracks>
                <PlayTrackButton onClick={() => this.play()}>
                  Play Playlist
                </PlayTrackButton>
              </Left>
              <Right>
                <ul>
                  {playlist.tracks &&
                    playlist.tracks.items.map(({ track }, i) => (
                      <TrackItem track={track} key={i} />
                    ))}
                </ul>
              </Right>
            </PlaylistContainer>
          </Main>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default Playlist;
