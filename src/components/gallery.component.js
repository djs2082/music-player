import React, { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip';

import '../css/gallery.css';
import FrontImageComponent from './FrontImageComponent';
import BackImageComponent from './BackImageComponent';
import AddAImage from './AddAImage';
import Loader from './Loader';
import Spotify from '../services/spotify';
import SpotifyPlayer from './../components/spotify.player';


const Gallery = () => {
  const [data, setData] = useState([]);
  // const [tracks, setTracks] = useState([]);
  const [dimensions, setDimensions] = useState({});
  const [flippedImage, setFlippedImage] = useState(null);
  const [songCount, setSongCount] = useState(0);
  const [songPlayingStatus, setSongPlayingStatus] = useState(false);

  useEffect(() => {
    const spotify = new Spotify();

    spotify.fetchPlayListTracks()
      .then((response) => {
        const playListTracks = response.data.items.map((track) => ({ track: track.track.id, image: track.track?.album?.images[0]?.url, name: track.track.name, previewUrl: track.track.preview_url }));
        // setTracks(playListTracks);
        localStorage.setItem("tracks", JSON.stringify(playListTracks))
      })
      .catch((error) => {
        console.log(error);
      })

    const handleStorageChange = (event) => {
      console.log(event);
      if (event.key === "config_data") {
        const dataFromStorage = localStorage.getItem("config_data");
        console.log(JSON.parse(dataFromStorage));
        if (dataFromStorage) {
          setData(JSON.parse(dataFromStorage))
        }
      }
    };


    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [])

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("config_data");
    console.log(JSON.parse(dataFromStorage));
    if (dataFromStorage) {
      setData(JSON.parse(dataFromStorage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("config_data")])

  const togglePlay = (image) => {
    console.log(flippedImage?.id === image.id)
    if (flippedImage?.id === image.id) {
      setFlippedImage(null);
      setSongPlayingStatus(false);
    }
    else {
      setFlippedImage(image)
      setSongPlayingStatus(true);
      setSongCount(songCount + 1)
    }
  }


  return (
    <div className='app-wrapper'>
      <div>
        <AddAImage />
        <SpotifyPlayer songId={flippedImage} songCount={songCount} />
      </div >
      <div >
        {/* isFlipped={flippedImage?.id === image.id} */}
        <div className="grid-container">
          {data.map(image =>
          (<ReactCardFlip flipDirection="horizontal" >
            <FrontImageComponent togglePlay={togglePlay} image={image} setDimensions={setDimensions} />
            <BackImageComponent showSong={flippedImage?.id === image.id} togglePlay={togglePlay} image={image} songCount={songCount} songPlayingStatus={songPlayingStatus} dimensions={dimensions} />
          </ReactCardFlip >)
          )}
        </div>
        <Loader />
      </div >
    </div >
  )
}
export default (Gallery)