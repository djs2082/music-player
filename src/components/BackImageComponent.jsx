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
  const [showBtn, setShowBtn] = useState(true);

  console.log(props.dimensions);

  useEffect(() => {
    if (!selectedSong) return;
    increaseLoaderCount();
    config.updateSongInConfig(props.image.id, selectedSong).then((res) => {
      increaseLoaderCount();
      awsObj
        .readConfig()
        .then((res) => {
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

  // useEffect(() => {
  //   const cards = document.getElementsByClassName("react-card-flipper");
  //   console.log(cards);
  //   if (cards) {
  //     cards[0].addEventListener("transitionstart", () => {
  //       setShowBtn(false);
  //       console.log("transitioning");
  //     });

  //     cards[0].addEventListener("transitionend", () => {
  //       setShowBtn(true);
  //       console.log("transitionend");
  //     });
  //   }
  // }, []);

  return (
    <div style={props.dimensions} className="back-card">
      <AddASong onSongSelected={setSelectedSong} />
      {
        <div className="card-back">
          <button
            id="open"
            onClick={() => {
              setShowBtn(false);
              props.togglePlay(image.id);
            }}
          >
            &gt;
          </button>
        </div>
      }
    </div>
  );
};

export default BackImageComponent;
