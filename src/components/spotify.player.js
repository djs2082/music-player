import React, { useEffect } from 'react';

const SpotifyPlayer = (props) => {
  // const spotifyPlayListId = "5iLgD55NtxGmVFvjy8Fhpl";

  useEffect(() => {
    const songs = localStorage.getItem('tracks').split(',')
    const index = Math.floor(Math.random() * (songs.length - 0) + 0);
    const songId = songs[index]
    // axios.post(
    //   "https://accounts.spotify.com/api/token",
    //   new URLSearchParams({
    //     grant_type: "client_credentials",
    //     client_id: "912ef809e5244d4394e52b7dfced0c92",
    //     client_secret: "ea562b14e1814f40b5b08655560a175e",
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // )
    //   .then((response) => {
    //     sessionStorage.setItem('spotify_access_token', response.data.access_token)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      console.log(songId)
      const element = document.getElementById(`embed-iframe`);
      const options = {
        uri: `spotify:track:${songId}`,
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
      // console.log(element, options, callback)
      console.log(element)
      // if (element) {
      //   console.log("JLJLK")
      IFrameAPI.createController(element, options, callback)
      // }
    };

    // Cleanup function to remove the embed on component unmount
    // return () => {
    //   const element = document.getElementById(`embed-iframe}`);
    //   if (element) {
    //     try {
    //       // Remove the Spotify embed by clearing the inner HTML or removing the element
    //       element.innerHTML = ''; // Clear the iframe
    //     }
    //     catch (error) {
    //       console.warn('Element not found, ignoring error:', error);
    //     }
    //     // Alternatively, if you want to remove the element completely
    //     // element.remove();
    //   }
    // };
  }, [])

  useEffect(() => {
    console.log(props.songCount);
    document.getElementById('embed-wrapper').click();
  }, [props.songCount])

  return (
    <div id="embed-wrapper" style={{ height: "30vh" }}>
      <div id='embed-iframe'></div>
    </div>
  )
}
export default SpotifyPlayer;