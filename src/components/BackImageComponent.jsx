import React, { useEffect, useState } from "react";
import "./../css/gallery.css";
import AddASong from "./AddASong";
import ConfigHandler from "../services/ConfigHandler";
import useUtilStore from "../services/useUtilStore";
import Aws from "../services/aws";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import ConfirmModal from "./Modals/ConfirmModal";
const BackImageComponent = (props) => {
  const image = props.image;
  const [selectedSong, setSelectedSong] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSongModal, setShowDeleteSongModal] = useState(false);
  const config = new ConfigHandler();
  const awsObj = new Aws();
  const { increaseLoaderCount, decreaseLoaderCount } = useUtilStore();

  const selectASong = (track, location, date) => {
    setSelectedSong(track);
    setLocation(location);
    setDate(date);
  };

  useEffect(() => {
    // if (!selectedSong) return;
    increaseLoaderCount();
    config
      .updateSongInConfig(props.image.id, selectedSong, location, date)
      .then((res) => {
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
  }, [selectedSong, location, date]);

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

  const deleteImage = () => {
    config
      .deleteTheConfig(image.id)
      .then(() => {
        awsObj
          .readConfig()
          .then((res) => {
            localStorage.setItem("config_data", res.Body);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSong = () => {
    config
      .deleteSongInConfig(image.id)
      .then(() => {
        awsObj
          .readConfig()
          .then((res) => {
            localStorage.setItem("config_data", res.Body);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={props.dimensions} className="back-card">
      <div className="controls">
        <PrimaryButton className="delete">
          <IconButton
            sx={{ color: "white", fontWeight: 600 }}
            onClick={() => setShowDeleteModal(true)}
          >
            Image <DeleteOutlineOutlinedIcon />
          </IconButton>
        </PrimaryButton>
        <PrimaryButton className="delete">
          <IconButton
            sx={{ color: "white", fontWeight: 600 }}
            onClick={() => setShowDeleteSongModal(true)}
          >
            Song <DeleteOutlineOutlinedIcon />
          </IconButton>
        </PrimaryButton>
      </div>
      <AddASong selectedSong={image?.song} onSongSelected={selectASong} />
      {image?.song && (
        <div>
          <img
            src={image?.song?.image}
            alt=""
            onClick={() => {
              // props.setSelectedImage(image);
              props.togglePlay(image);
            }}
          />
          {/* <p>Selected song is {image?.song?.name}</p> */}
          {/* <p>Date: {image?.song?.date}</p> */}
          {image?.location && <p>Location: {image?.location}</p>}
          {image?.date && <p>Date: {image?.date}</p>}
        </div>
      )}
      {
        <div className="card-back">
          <button
            id="open"
            onClick={(e) => {
              e.stopPropagation();
              // props.setSelectedImage();
              props.setFlippedImage();
              // props.togglePlay(image);
            }}
          >
            &gt;
          </button>
        </div>
      }
      <ConfirmModal
        style={{ border: "none", height: "200px" }}
        header="Please Confirm!"
        body="Are You Sure you want to delete this Image!!"
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        primaryButton={
          <PrimaryButton onClick={deleteImage}>Confirm</PrimaryButton>
        }
        secondaryButton={
          <SecondaryButton onClick={() => setShowDeleteModal(false)}>
            Cancel
          </SecondaryButton>
        }
      />
      <ConfirmModal
        style={{ border: "none", height: "240px" }}
        header="Please Confirm!"
        body="Are You Sure you want to delete this Song for Image!!"
        show={showDeleteSongModal}
        onHide={() => setShowDeleteSongModal(false)}
        primaryButton={
          <PrimaryButton onClick={deleteSong}>Confirm</PrimaryButton>
        }
        secondaryButton={
          <SecondaryButton onClick={() => setShowDeleteSongModal(false)}>
            Cancel
          </SecondaryButton>
        }
      />
    </div>
  );
};

export default BackImageComponent;
