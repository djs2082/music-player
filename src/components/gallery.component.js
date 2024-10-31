import React, { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip';

import '../css/gallery.css';
import FrontImageComponent from './FrontImageComponent';
import BackImageComponent from './BackImageComponent';
import AddAImage from './AddAImage';
import Loader from './Loader';
import Spotify from '../services/spotify';
import useUtilStore from '../services/useUtilStore';


const Gallery = () => {
  const [data, setData] = useState([]);
  // const [tracks, setTracks] = useState([]);
  const [dimensions, setDimensions] = useState({});
  const [flippedImageId, setFlippedImageId] = useState(null);
  const [isPhotoClicked, setIsPhotoClicked] = useState(false);
  const [songCount, setSongCount] = useState(0);
  const [songPlayingStatus, setSongPlayingStatus] = useState(false);

  const { loaderCount, increaseLoaderCount, decreaseLoaderCount } = useUtilStore();

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
  }, [])

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("config_data");
    if (dataFromStorage) {
      setData(JSON.parse(dataFromStorage))
    }
  }, [localStorage.getItem("config_data")])

  const togglePlay = (id) => {
    if (flippedImageId === id) {
      setFlippedImageId(null);
      setSongPlayingStatus(false);
    }
    else {
      setFlippedImageId(id)
      setSongPlayingStatus(true);
    }
  }


  return (
    <div className={isPhotoClicked ? 'app-wrapper' : ''} >
      < div >
        <h1>The Purest of Doggos</h1>
        <AddAImage />
        <div >
          <div className="grid-container">
            {data.map(image =>
            (<ReactCardFlip isFlipped={flippedImageId === image.id} flipDirection="horizontal" >
              <FrontImageComponent togglePlay={togglePlay} image={image} setDimensions={setDimensions} />
              <BackImageComponent togglePlay={togglePlay} image={image} songCount={songCount} songPlayingStatus={songPlayingStatus} dimensions={dimensions} />
            </ReactCardFlip >)
            )}
          </div>
        </div >
        <Loader />
      </div >
    </div >
  )
}
export default (Gallery)