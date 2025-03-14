import React, { useEffect, useState, useRef } from 'react'
import ReactCardFlip from 'react-card-flip';

import '../css/gallery.css';
import FrontImageComponent from './FrontImageComponent';
import BackImageComponent from './BackImageComponent';
import Loader from './Loader';
import Spotify from '../services/spotify';
import SpotifyPlayer from './../components/spotify.player';
import NavBar from './NabBar';


const Gallery = () => {
  const [data, setData] = useState([]);
  // const [tracks, setTracks] = useState([]);
  const [dimensions, setDimensions] = useState({});
  const [flippedImage, setFlippedImage] = useState(null);
  const [songCount, setSongCount] = useState(0);
  const [songPlayingStatus, setSongPlayingStatus] = useState(false);
  const [musicPlyaerHovered, setMusicPlayerHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imageRefs = useRef([])

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
      window.location.reload();
      // console.log(event);
      // if (event.key === "config_data") {
      //   const dataFromStorage = localStorage.getItem("config_data");
      //   if (dataFromStorage) {
      //     setData(JSON.parse(dataFromStorage).slice(0, 2))
      //   }
      // }
    };


    // window.addEventListener("storage", handleStorageChange);
    const dataFromStorage = localStorage.getItem("config_data");
    if (dataFromStorage) {
      setData(JSON.parse(dataFromStorage).reverse())
    }
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);

    };
  }, [])

  const updateFlippedImage = (image) => {
    if (image?.id === flippedImage?.id) {
      setFlippedImage(null);
    }
    else {
      setFlippedImage(image);
    }
  }



  useEffect(() => {
    const dataFromStorage = localStorage.getItem("config_data");
    if (dataFromStorage) {
      setData(JSON.parse(dataFromStorage).reverse())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("config_data")])

  const togglePlay = (image) => {
    if (selectedImage?.id === image.id) {
      // setFlippedImage(null);
      setSongPlayingStatus(false);
    }
    else {
      // setFlippedImage(image)
      setSelectedImage(image)
      setSongPlayingStatus(true);
      setSongCount(songCount + 1)
    }
  }

  const setImageDimensions = (dimensions, imageId) => {
    setDimensions({ ...dimensions, [imageId.toString()]: dimensions })
  }

  const deleteImage = (image) => {

  }

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    // setSelectedImage(data[randomIndex])
    scrollToImage(randomIndex)
  }

  const scrollToImage = (index) => {
    imageRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <div className='app-wrapper'>
      <NavBar />
      {selectedImage &&
        <div className={`song-player-wrapper ${musicPlyaerHovered ? 'song-player-hovered' : ''}`} onMouseEnter={() => setMusicPlayerHovered(true)} onMouseLeave={() => setMusicPlayerHovered(false)}>
          <SpotifyPlayer selectRandomImage={selectRandomImage} songId={selectedImage} songCount={songCount} />
        </div>
      }
      <div >
        {/* isFlipped={flippedImage?.id === image.id} */}
        <div className="grid-container">
          {data.map((image, index) => {
            return (
              <div ref={(el) => imageRefs.current[index] = el}>
                <ReactCardFlip isFlipped={flippedImage?.id === image.id} flipDirection="horizontal" >
                  <FrontImageComponent togglePlay={togglePlay} image={image} setDimensions={setImageDimensions} selectedImage={selectedImage} setSelectedImage={() => setSelectedImage(image)} setFlippedImage={() => updateFlippedImage(image)} />
                  <BackImageComponent setSelectedImage={setSelectedImage} showSong={(flippedImage?.id === image.id)} togglePlay={togglePlay} image={image} songCount={songCount} songPlayingStatus={songPlayingStatus} dimensions={dimensions[image.id.toString()]} setFlippedImage={() => updateFlippedImage(image)} deleteImage={() => deleteImage(image)} />
                </ReactCardFlip >
              </div>)
          }
          )}
        </div>
        <Loader />
      </div >
    </div >
  )
}
export default (Gallery)