import React, { Component } from "react";
import styled from "styled-components/macro";
import { getTopTracksLong } from "../spotify";
import { Main, mixins } from "../styles";
import { catchErrors } from "../utils";
import Loader from "./Loader";
import TrackItem from "./TrackItem";

const Header = styled.header`
  ${mixins.flexBetween};
  h2 {
    margin: 0;
  }
`;

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

class TopTracks extends Component {
  state = {
    topTracks: null,
    activeRange: "long"
  };

  apiCalls = {
    long: getTopTracksLong()
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getTopTracksLong();
    this.setState({ topTracks: data });
  }

  async changeRange(range) {
    const { data } = await this.apiCalls[range];
    this.setState({ topTracks: data, activeRange: range });
  }

  setActiveRange = (range) => catchErrors(this.changeRange(range));

  render() {
    const { topTracks } = this.state;

    return (
      <Main>
        <Header>
          <h2>Top Tracks</h2>
        </Header>
        <TracksContainer>
          {topTracks ? (
            topTracks.items.map((track, i) => (
              <TrackItem track={track} key={i} />
            ))
          ) : (
            <Loader />
          )}
        </TracksContainer>
      </Main>
    );
  }
}

export default TopTracks;
