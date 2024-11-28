import React, { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import "./../css/song_list.css";
import { IconButton, Tooltip } from "@mui/material";
const SelectSongList = ({ songs, selectedTrack, setSelectedTrack }) => {
  // const [selectedTrack, setSelectedTrack] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [toolTipValue, setToolTipValue] = useState("Select This Song");

  const updatePlayingTrack = (newTrack, index, e = null) => {
    if (e) e.stopPropagation();
    const playingTracks = document.getElementsByClassName("audio-track");
    Array.from(playingTracks).forEach((track) => {
      track.pause();
    });

    if (playingTrack?.track === newTrack.track) {
      setPlayingTrack(null);
    } else {
      const audioRef = document.getElementById(`track-${newTrack.track}`);
      audioRef.addEventListener("ended", () => {
        let nextIndex = index === songs.length - 1 ? 0 : index + 1;
        updatePlayingTrack(songs[nextIndex], nextIndex);
        setSelectedTrack(songs[nextIndex]);
        const element = document.getElementById(
          `track-wrapper-${songs[nextIndex].track}`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
        }
      });
      setPlayingTrack(newTrack);
      console.log(newTrack);
      audioRef.play();
    }
  };

  return (
    <>
      <div className="song-list-wrapper">
        {songs.map((track, index) => {
          return (
            <Tooltip title={toolTipValue}>
              <div
                onClick={() => {
                  if (track.track === selectedTrack?.track)
                    setSelectedTrack(null);
                  else setSelectedTrack(track);
                }}
                className={`song-wrapper ${
                  selectedTrack?.track === track.track ? "selected" : ""
                }`}
                id={`track-wrapper-${track.track}`}
              >
                <img src={track.image} alt=""></img>
                <p>{track.name}</p>
                <span>
                  <Tooltip
                    title={
                      playingTrack?.track !== track.track ? "Play" : "Pause"
                    }
                  >
                    <IconButton
                      onClick={(e) => updatePlayingTrack(track, index, e)}
                      disableRipple
                      onMouseEnter={() => setToolTipValue(undefined)}
                      onMouseLeave={() => setToolTipValue("Select This Song")}
                    >
                      {playingTrack?.track !== track.track ? (
                        <PlayCircleIcon
                          className="play-pause-icon"
                          sx={{
                            "&:focus": { outline: "none" },
                          }}
                        />
                      ) : (
                        <PauseCircleOutlineIcon className="play-pause-icon" />
                      )}
                    </IconButton>
                  </Tooltip>
                </span>
                <audio
                  className="audio-track"
                  id={`track-${track.track}`}
                  autoPlay
                >
                  <source src={track?.previewUrl} type="audio/mpeg" />
                </audio>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};
export default SelectSongList;
