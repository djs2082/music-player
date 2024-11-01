import React, { useEffect, useState } from "react";
import "./../css/gallery.css";
import AddASong from "./AddASong";
import ConfigHandler from "../services/ConfigHandler";
import useUtilStore from "../services/useUtilStore";
import Aws from "../services/aws";
const BackImageComponent = (props) => {
  const image = props.image;
  const [selectedSong, setSelectedSong] = useState(null);
  const config = new ConfigHandler();
  const awsObj = new Aws();
  const { increaseLoaderCount, decreaseLoaderCount } = useUtilStore();
  useEffect(() => {
    console.log(selectedSong);
    if (!selectedSong) return;
    console.log(selectedSong);
    increaseLoaderCount();
    config.updateSongInConfig(props.image.id, selectedSong).then((res) => {
      increaseLoaderCount();
      awsObj
        .readConfig()
        .then((res) => {
          console.log(res.Body);
          decreaseLoaderCount();
          decreaseLoaderCount();
          localStorage.setItem("config_data", res.Body);
        })
        .catch((error) => {
          decreaseLoaderCount();
          console.log(error);
        })
        .catch(() => {
          decreaseLoaderCount();
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSong]);
  return (
    <div
      style={props.dimensions}
      className="back-card"
      onClick={() => props.togglePlay(image.id)}
    >
      <AddASong onSongSelected={setSelectedSong} />
    </div>
  );
};

export default BackImageComponent;
