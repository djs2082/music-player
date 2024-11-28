import axios from 'axios';

class Spotify {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    console.log(process.env.REACT_APP_SPOTIFY_PLAYLIST_ID)
    this.spotifyPlayListId = process.env.REACT_APP_SPOTIFY_PLAYLIST_ID;
  }


  fetchPlayListTracks = () => {
    return (axios.get(`https://api.spotify.com/v1/playlists/${this.spotifyPlayListId}/tracks`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }))
  }


  fetchTrackDetails = (trackId) => {
    return (axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken} `
      }
    }))
  }
}

export default Spotify;