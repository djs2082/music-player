import React from "react";
import "./../css/gallery.css";
import AddASong from "./AddASong";
import SpotifyPlayer from "./spotify.player";
const BackImageComponent = (props) => {
  const image = props.image;
  return (
    <div
      style={props.dimensions}
      className="back-card"
      onClick={() => props.togglePlay(image.id)}
    >
      <AddASong />
      {props.songPlayingStatus && (
        <SpotifyPlayer songId={props.image.song} songCount={props.songCount} />
      )}
    </div>
  );
};

export default BackImageComponent;
