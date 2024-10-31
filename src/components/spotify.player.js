import React, { useEffect } from 'react';

const SpotifyPlayer = (props) => {
  useEffect(() => {
    const tracks = localStorage.getItem('tracks');
    const parsedTracks = JSON.parse(tracks);
    const index = Math.floor(Math.random() * (parsedTracks.length - 0) + 0);
    const songId = props.songId || parsedTracks[index]

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      console.log(songId)
      const element = document.getElementById(`embed-iframe`);
      const options = {
        uri: `spotify:track:${songId?.track}`,
        height: '100%'
      };
      const callback = (EmbedController) => {
        EmbedController.play();
        document.getElementById('embed-wrapper').addEventListener('click', () => {
          console.log("change song now")
          const songs = localStorage.getItem('tracks').split(',')
          const index = Math.floor(Math.random() * (songs.length - 0) + 0);
          const songId = songs[index]
          EmbedController.loadUri(`spotify:track:${songId}`)
          EmbedController.play();
        })
      };
      IFrameAPI.createController(element, options, callback)
    };
  }, [])

  useEffect(() => {
    document.getElementById('embed-wrapper').click();
  }, [props.songCount])

  return (
    <div id="embed-wrapper" style={{ height: "30vh" }}>
      <div id='embed-iframe'></div>
    </div>
  )
}
export default SpotifyPlayer;