import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "white",
        marginLeft: -100,
        width: "99vw",
        position: "fixed",
        bottom: 0
      }}
    >
      <SpotifyPlayer
        name="Musipp Web Player"
        persistDeviceSelection="true"
        magnifySliderOnHover="true"
        token={window.localStorage.getItem("spotify_access_token")}
        uris={["spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"]}
        styles={{
          bgColor: "#333",
          color: "#F48FB1",
          loaderColor: "#F48FB1",
          sliderColor: "#F48FB1",
          savedColor: "#F48FB1",
          trackArtistColor: "#F48FB1",
          trackNameColor: "#F48FB1",
          height: 80
          //   sliderHeight: 100
        }}
      />
    </div>
  );
};

export default Player;
