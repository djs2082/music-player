import React, { useState, useEffect } from 'react';

const SpotifyPlayer = (props) => {
  /* eslint-disable no-unused-vars */
  const [song, setSong] = useState(null);


  function triggerCustomClick(song) {
    const element = document.getElementById('embed-wrapper');
    const customEvent = new CustomEvent('customClick', {
      detail: { song }
    });
    element.dispatchEvent(customEvent);
  }


  useEffect(() => {
    const tracks = localStorage.getItem('tracks');
    const parsedTracks = JSON.parse(tracks);
    if (parsedTracks) {
      const index = Math.floor(Math.random() * (parsedTracks?.length - 0) + 0);
      const songId = props.songId?.song || parsedTracks[index]
      setSong(songId);


      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById(`embed-iframe`);
        const options = {
          uri: `spotify:track:${songId?.track}`,
          height: '100%'
        };
        const callback = (EmbedController) => {
          EmbedController.play();


          document.getElementById('embed-wrapper').addEventListener('customClick', function (event) {
            const { song } = event.detail;

            // Execute your logic with param1 and param2
            if (!song) {
              const songs = localStorage.getItem('tracks')
              const parsedSongs = JSON.parse(songs);
              const index = Math.floor(Math.random() * (parsedSongs.length - 0) + 0);
              const songId = parsedSongs[index]
              EmbedController.loadUri(`spotify:track:${songId.track}`)
              EmbedController.play();
            }
            else {
              EmbedController.loadUri(`spotify:track:${song.track}`)
              EmbedController.play();
            }
          });



          // document.getElementById('embed-wrapper').addEventListener('click', () => {
          //   console.log("change song now")
          //   console.log(song);
          //   if (!song) {
          //     const songs = localStorage.getItem('tracks')
          //     const parsedSongs = JSON.parse(songs);
          //     const index = Math.floor(Math.random() * (parsedSongs.length - 0) + 0);
          //     console.log(parsedSongs)
          //     const songId = parsedSongs[index]
          //     console.log(songId);
          //     EmbedController.loadUri(`spotify:track:${songId.track}`)
          //     EmbedController.play();
          //   }
          //   else {
          //     EmbedController.loadUri(`spotify:track:${song.track}`)
          //     EmbedController.play();
          //   }

          // })
        };
        IFrameAPI.createController(element, options, callback)
      }
    };
  }, [props.songId])

  useEffect(() => {

    setSong(props.songId?.song);
    // document.getElementById('embed-wrapper').click();
    triggerCustomClick(props.songId?.song);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.songCount])

  return (
    <div id="embed-wrapper" style={{ height: "30vh" }}>
      <div id='embed-iframe'></div>
    </div>
  )
}
export default SpotifyPlayer;