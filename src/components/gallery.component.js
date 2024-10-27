import React, { Component } from 'react'
import axios from 'axios';


import '../css/gallery.css';
import SpotifyPlayer from './spotify.player';
import { SERVER_URL } from '../constants';
import image1 from './images/image1.jpeg'
import image2 from './images/image2.jpeg'
import image3 from './images/image3.jpeg'
import image4 from './images/image4.jpeg'
import image5 from './images/image5.jpeg'
import image6 from './images/image6.jpeg'
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [{
        image_id: 1,
        image: image1,
      }, {
        image_id: 2,
        image: image2
      }, {
        image_id: 3,
        image: image3
      }, {
        image_id: 4,
        image: image4
      }, {
        image_id: 5,
        image: image5
      }, {
        image_id: 6,
        image: image6
      }],
      song: `${SERVER_URL}/media/songs/Jeena.mp3`,
      play: false,
      tracks: [],
      flippedImageId: null,
      isPhotoClicked: false,
      songCount: 0,
    }
    this.audio = new Audio("")

  }


  componentDidMount = () => {
    console.log(this.state.song)
    const spotifyPlayListId = "5iLgD55NtxGmVFvjy8Fhpl";


    const accessToken = localStorage.getItem('accessToken');

    axios.get(`https://api.spotify.com/v1/playlists/${spotifyPlayListId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        // alert(response)
        const playListTracks = response.data.items.map((track) => track.track.id)
        this.setState({ tracks: playListTracks })
        localStorage.setItem("tracks", playListTracks)
      })
      .catch((error) => {

      })

    // axios.get(`${SERVER_URL}/images`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })
    //   .then(response => {
    //     console.log(response)
    //     if (response.status === 200) {
    //       if (response.data.Status === 200) {
    //         console.log(response.data)
    //         this.setState({ images: response.data.Data });
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     alert(`${SERVER_URL}/images`)
    //     console.log(error.toString())
    //   });
    // axios.get(`${SERVER_URL}/images/song`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })
    //   .then(response => {
    //     console.log(response)
    //     if (response.status == 200) {
    //       if (response.data.Status == 200) {
    //         console.log(response.data.Data)
    //         this.setState({ songs: response.data.Data });
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error.toString())
    //   });


  }
  togglePlay = () => {
    this.setState({ isPhotoClicked: true, songCount: this.state.songCount + 1 })
    // let index = Math.floor(Math.random() * (this.state.songs.length - 0) + 0);
    // let songs = this.state.songs;
    // songs[index].play = true
    // let song = songs[index].song
    // this.audio.pause()
    // if ('audio' in songs[index]) {
    //   this.audio = songs[index].audio
    // }
    // else {
    //   songs[index].audio = new Audio(SERVER_URL + song)
    //   this.audio = songs[index].audio
    // }

    // this.audio.play()

    // console.log(index)

    // this.setState({ songs: songs, song: SERVER_URL + song }, () => {

    // });
  }

  imageClicked = (id) => {
    console.log(id);
    this.setState({ flippedImageId: id })
  }

  render() {
    var i = -1;
    var images = this.state.images.map(image => {
      i++;
      var class_name = 'grid-item grid-item-' + i
      return (<div><img onClick={this.togglePlay} className={class_name} src={image.image} alt='' /><p>{image.caption}</p></div>)
    })
    return (
      <div className={this.state.isPhotoClicked ? 'app-wrapper' : ''}>
        {this.state.isPhotoClicked && <div className="music-wrapper">
          <div className="beautyfull-text">
            <p>
              This Song Reminds me that You are the Angel This Song Reminds me that You are the Angel This Song Reminds me that You are the Angel This Song Reminds me that You are the Angel
            </p>
          </div>
          <SpotifyPlayer songCount={this.state.songCount} />
        </div>}
        <div>
          <h1>The Purest of Doggos</h1>
          <div className="grid-container">
            {images}
          </div>
        </div>
      </div>
    )
  }
}
export default (Gallery)