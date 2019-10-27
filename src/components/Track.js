import React, { Component } from "react";
import PropTypes from "prop-types";
import { getYear, catchErrors } from "../utils";
import { getTrackInfo, playTrack } from "../spotify";

import Loader from "./Loader";

import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors } = theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
  ${media.phablet`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.phablet`
    margin: 0 auto;
  `};
`;
const Info = styled.div`
  flex-grow: 1;
  ${media.phablet`
    text-align: center;
    margin-top: 30px;
  `};
`;
const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;
const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 5px;
  ${media.tablet`
    font-size: 30px;
  `};
`;
const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
  text-align: left !important;
  ${media.tablet`
    font-size: 20px;
  `};
  ${media.phablet`
    text-align: center !important;
  `};
`;
const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;

class Track extends Component {
  static propTypes = {
    trackId: PropTypes.string
  };

  state = {
    track: null,
    audioAnalysis: null,
    audioFeatures: null
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { trackId } = this.props;
    const { track, audioFeatures } = await getTrackInfo(trackId);
    this.setState({ track, audioFeatures });
  }
  async play() {
    const { trackId } = this.props;
    await playTrack(trackId);
  }
  render() {
    const { track } = this.state;

    return (
      <React.Fragment>
        {track ? (
          <Main>
            <TrackContainer>
              <Artwork>
                <img src={track.album.images[0].url} alt="Album Artwork" />
              </Artwork>
              <Info>
                <Title>{track.name}</Title>
                <ArtistName>
                  {track.artists &&
                    track.artists.map(({ name }, i) => (
                      <span key={i}>
                        {name}
                        {track.artists.length > 0 &&
                        i === track.artists.length - 1
                          ? ""
                          : ","}
                        &nbsp;
                      </span>
                    ))}
                </ArtistName>
                <Album>
                  <a
                    href={track.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.album.name}
                  </a>{" "}
                  &middot; {getYear(track.album.release_date)}
                </Album>
                <PlayTrackButton onClick={() => this.play()}>
                  Play Track
                </PlayTrackButton>
              </Info>
            </TrackContainer>
          </Main>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default Track;
