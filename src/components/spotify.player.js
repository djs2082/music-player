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
          height: '100%',
          autoPlay: 'true',
          allow: ["encrypted-media"]
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
            }
            else {
              EmbedController.loadUri(`spotify:track:${song.track}`)
              EmbedController.addListener('ready', () => {
                EmbedController.play()
              });
              EmbedController.addListener('playback_update', (e) => {
                if (e.data.position === e.data.duration && e.data.position !== 0) {
                  props.selectRandomImage()
                }
              });
            }
          });
        };
        const newElement = document.getElementById(`embed-wrapper`);
        // console.log(newElement)
        if (!element) {
          const childDiv = document.createElement('div');
          childDiv.id = 'embed-iframe';
          // console.log(childDiv, options)
          IFrameAPI.createController(childDiv, options, callback)

        }
        else {
          // console.log(element)
          IFrameAPI.createController(element, options, callback)

        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.songId])

  useEffect(() => {
    // console.log(props.songId?.song)
    setSong(props.songId?.song);
    // document.getElementById('embed-wrapper').click();
    triggerCustomClick(props.songId?.song);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.songCount])

  return (
    <div id="embed-wrapper" style={{ height: "20vh" }} >
      <div id='embed-iframe'></div>
    </div>
  )
}
export default SpotifyPlayer;