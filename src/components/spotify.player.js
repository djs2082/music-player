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
      const element = document.getElementById(`embed-iframe-${props.id}`);
      const options = {
        uri: `spotify:track:${songId}`
      };
      const callback = (EmbedController) => { };
      // console.log(element, options, callback)
      console.log(element)
      if (element) {
        console.log("JLJLK")
        IFrameAPI.createController(element, options, callback)
      }
    };

    // Cleanup function to remove the embed on component unmount
    return () => {
      const element = document.getElementById(`embed-iframe-${props.id}`);
      if (element) {
        try {
          // Remove the Spotify embed by clearing the inner HTML or removing the element
          element.innerHTML = ''; // Clear the iframe
        }
        catch (error) {
          console.warn('Element not found, ignoring error:', error);
        }
        // Alternatively, if you want to remove the element completely
        // element.remove();
      }
    };
  }, [props.id])

  return (
    <div id={`embed-iframe-${props.id}`}></div>
  )
}
export default SpotifyPlayer;