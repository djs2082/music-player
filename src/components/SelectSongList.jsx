import React, { useEffect, useRef, useState } from "react";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import "./../css/song_list.css";
// import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
const SelectSongList = ({ songs, selectedTrack, setSelectedTrack }) => {
  // const [selectedTrack, setSelectedTrack] = useState(null);
  // const [playingTrack, setPlayingTrack] = useState(null);
  // const [toolTipValue, setToolTipValue] = useState("Select This Song");
  const [visibleTracks, setVisibleTracks] = useState([]);

  const containerRef = useRef(null);

  const loadMoreTracks = () => {
    const nextTracks = songs.slice(
      visibleTracks.length,
      visibleTracks.length + 6
    );
    setVisibleTracks((prev) => [...prev, ...nextTracks]);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log(
        containerRef.current.scrollTop + containerRef.current.clientHeight
      );
      console.log(containerRef.current.scrollHeight);
      if (
        containerRef.current.scrollHeight -
        (containerRef.current.scrollTop + containerRef.current.clientHeight < 2)
      ) {
        loadMoreTracks();
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleTracks]);

  useEffect(() => {
    loadMoreTracks(); // Load initial tracks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const updatePlayingTrack = (newTrack, index, e = null) => {
  //   if (e) e.stopPropagation();
  //   const playingTracks = document.getElementsByClassName("audio-track");
  //   Array.from(playingTracks).forEach((track) => {
  //     track.pause();
  //   });

  //   if (playingTrack?.track === newTrack.track) {
  //     setPlayingTrack(null);
  //   } else {
  //     const audioRef = document.getElementById(`track-${newTrack.track}`);
  //     audioRef.addEventListener("ended", () => {
  //       let nextIndex = index === songs.length - 1 ? 0 : index + 1;
  //       updatePlayingTrack(songs[nextIndex], nextIndex);
  //       setSelectedTrack(songs[nextIndex]);
  //       const element = document.getElementById(
  //         `track-wrapper-${songs[nextIndex].track}`
  //       );
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the element
  //       }
  //     });
  //     setPlayingTrack(newTrack);
  //     console.log(newTrack);
  //     audioRef.play();
  //   }
  // };

  return (
    <>
      <div className="song-list-wrapper" ref={containerRef}>
        {/* <iframe
          style={{ borderRadius: "12px" }}
          width="100%"
          height="152"
          title="Spotify Embed: My Path to Spotify: Women in Engineering "
          frameborder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"
          loading="lazy"
          src="https://open.spotify.com/embed/episode/7makk4oTQel546B0PZlDM5?utm_source=oembed"
        ></iframe> */}
        {/* <iframe
          style={{ borderRadius: "12px" }}
          width="100%"
          height="152"
          title="Spotify Embed: My Path to Spotify: Women in Engineering "
          frameborder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"
          loading="lazy"
          src={`https://open.spotify.com/embed/track/${songs[0].track}?utm_source=oembed`}
        ></iframe> */}
        {visibleTracks.map((track, index) => {
          return (
            <div
              // style={{ height }}
              onClick={() => {
                console.log(track.track, selectedTrack);
                if (track.track === selectedTrack?.track)
                  setSelectedTrack(null);
                else setSelectedTrack(track);
              }}
              className={`song-wrapper ${
                selectedTrack?.track === track.track ? "selected" : ""
              }`}
              id={`track-wrapper-${track.track}`}
            >
              <iframe
                style={{ borderRadius: "12px" }}
                width="100%"
                height="80px"
                title="Spotify Embed: My Path to Spotify: Women in Engineering "
                frameborder="0"
                allowfullscreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"
                loading="lazy"
                src={`https://open.spotify.com/embed/track/${track.track}?utm_source=oembed`}
              ></iframe>
              <div>
                <FavoriteIcon
                  sx={{
                    color:
                      selectedTrack?.track === track.track ? "red" : "black",
                  }}
                />
              </div>
              {/* <div
                onClick={() => {
                  console.log(track.track, selectedTrack);
                  if (track.track === selectedTrack?.track)
                    setSelectedTrack(null);
                  else setSelectedTrack(track);
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              ></div> */}
            </div>
          );
          // return (
          //   <Tooltip title={toolTipValue}>
          //     <div
          //       onClick={() => {
          //         if (track.track === selectedTrack?.track)
          //           setSelectedTrack(null);
          //         else setSelectedTrack(track);
          //       }}
          //       className={`song-wrapper ${
          //         selectedTrack?.track === track.track ? "selected" : ""
          //       }`}
          //       id={`track-wrapper-${track.track}`}
          //     >
          //       <img src={track.image} alt=""></img>
          //       <p>{track.name}</p>
          //       <span>
          //         <Tooltip
          //           title={
          //             playingTrack?.track !== track.track ? "Play" : "Pause"
          //           }
          //         >
          //           <IconButton
          //             onClick={(e) => updatePlayingTrack(track, index, e)}
          //             disableRipple
          //             onMouseEnter={() => setToolTipValue(undefined)}
          //             onMouseLeave={() => setToolTipValue("Select This Song")}
          //           >
          //             {playingTrack?.track !== track.track ? (
          //               <PlayCircleIcon
          //                 className="play-pause-icon"
          //                 sx={{
          //                   "&:focus": { outline: "none" },
          //                 }}
          //               />
          //             ) : (
          //               <PauseCircleOutlineIcon className="play-pause-icon" />
          //             )}
          //           </IconButton>
          //         </Tooltip>
          //       </span>
          //       <audio
          //         className="audio-track"
          //         id={`track-${track.track}`}
          //         autoPlay
          //       >
          //         <source src={track?.previewUrl} type="audio/mpeg" />
          //       </audio>
          //     </div>
          //   </Tooltip>
          // );
        })}
        {visibleTracks.length < songs.length && <p>Loading more tracks...</p>}
      </div>
    </>
  );
};
export default SelectSongList;
