import React, { Component } from 'react'
import axios from 'axios';
import Sound from 'react-sound';


import '../css/gallery.css';
import SpotifyPlayer from './spotify.player';
import { SERVER_URL } from '../constants';
import image1 from './images/image1.jpeg'
import image2 from './images/image2.jpeg'
import image3 from './images/image3.jpeg'
import image4 from './images/image4.jpeg'
import image5 from './images/image5.jpeg'

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
      }],
      song: `${SERVER_URL}/media/songs/Jeena.mp3`,
      play: false,
      tracks: [],
      flippedImageId: null
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
    let index = Math.floor(Math.random() * (this.state.songs.length - 0) + 0);
    let songs = this.state.songs;
    songs[index].play = true
    let song = songs[index].song
    this.audio.pause()
    if ('audio' in songs[index]) {
      this.audio = songs[index].audio
    }
    else {
      songs[index].audio = new Audio(SERVER_URL + song)
      this.audio = songs[index].audio
    }

    this.audio.play()

    console.log(index)

    this.setState({ songs: songs, song: SERVER_URL + song }, () => {

    });
  }

  imageClicked = (id) => {
    console.log(id);
    this.setState({ flippedImageId: id })
  }

  render() {
    var i = -1;
    // var images = this.state.images.map(image => {
    //   i++;
    //   var class_name = 'grid-item grid-item-' + i
    //   return (<div><img onClick={this.togglePlay} className={class_name} src={'http://localhost:8000' + image.image} alt='' /><p>{image.caption}</p></div>)
    // })

    var images = this.state.images.map(image => {
      i++;
      var class_name = 'grid-item grid-item-' + i
      return (
        <div className={`${class_name} scene scene--card`}>
          <div className={`gallery-card ${this.state.flippedImageId === image.image_id ? 'is-flipped' : ''}`}>
            <div className="card__face card__face--front"><img onClick={() => this.imageClicked(image.image_id)} className={class_name} src={image.image} alt='' /><p>{image.caption}</p></div>
            <div className="card__face card__face--back" onClick={() => this.imageClicked(image.image_id)}>{(this.state.flippedImageId === image.image_id) && <div><SpotifyPlayer id={image.image_id} /></div>}</div>
          </div>
        </div>)
    })

    return (
      <div>
        {/* <SpotifyPlayer /> */}
        <h1>The Purest of Doggos</h1>
        <div className="grid-container">
          {images}
        </div>
        <div>
          {/* <div className="scene scene--card">
            <div className={`card ${this.state.isFlipped ? 'is-flipped' : ''}`}>
              <div className="card__face card__face--front"><img onClick={() => this.setState({ isFlipped: !this.state.isFlipped })} src={'http://localhost:8000' + this.state.images[0]?.image} alt='' /><p>image.caption</p></div>
              <div className="card__face card__face--back"><img onClick={() => this.setState({ isFlipped: !this.state.isFlipped })} src={'http://localhost:8000' + this.state.images[1]?.image} alt='' /><p>image.caption</p></div>
            </div>
          </div> */}
          {/* {images} */}
        </div>
        <audio id="myAudio">
          <source src="http://localhost:8000/media/songs/Jeena.mp3" type="audio/mpeg" />
        </audio>
      </div>
    )
  }
}
export default (Gallery)