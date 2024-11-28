import React, { useEffect, useState } from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import CustomModal from "./Modals/Modal";
import ImageUpload from "./ImageUpload";
import AddASong from "./AddASong";
import "./../css/add_image.css";
import SecondaryButton from "./Buttons/SecondaryButton";
// import { IconButton, Tooltip } from "@mui/material";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Aws from "../services/aws";
import ConfigHandler from "../services/ConfigHandler";
import useUtilStore from "../services/useUtilStore";
import SpotifyPlayer from "./spotify.player";

const AddAImage = ({ show, setShow }) => {
  // const [show, setShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [previewPlayed, setPreveiwPlayed] = useState(false);

  const { increaseLoaderCount, decreaseLoaderCount, setUploadProgress } =
    useUtilStore();

  useEffect(() => {
    const audioRef = document.getElementById("preview-audio-track");
    audioRef?.load();
    audioRef?.play();
    // setPreveiwPlayed(true);
  }, [selectedSong]);

  // const playPauseSongPreview = () => {
  //   const audioRef = document.getElementById("preview-audio-track");

  //   if (previewPlayed) audioRef.pause();
  //   else audioRef.play();
  //   setPreveiwPlayed(!previewPlayed);

  //   audioRef?.addEventListener("ended", () => {
  //     setPreveiwPlayed(false);
  //   });
  // };

  const onCancel = () => {
    setShow(false);
    setUploadProgress(0);
    setSelectedImage(null);
    setSelectedSong(null);
  };

  const onSave = () => {
    const awsObj = new Aws();
    const configHandler = new ConfigHandler();
    increaseLoaderCount();
    awsObj
      .uploadFile(selectedImage, setUploadProgress)
      .then((err, data) => {
        const publicUrl = `https://dr-music-player.s3.amazonaws.com/${selectedImage.name}`;
        increaseLoaderCount();
        configHandler
          .addNewConfig(selectedSong, publicUrl)
          .then((err, data) => {
            increaseLoaderCount();
            awsObj
              .readConfig()
              .then((res) => {
                decreaseLoaderCount();
                decreaseLoaderCount();
                decreaseLoaderCount();
                localStorage.setItem("config_data", res.Body);
                onCancel();
                window.location.reload();
              })
              .catch((error) => {
                decreaseLoaderCount();
                console.log(error);
              });
            console.log(err, data);
          })
          .catch(() => {
            decreaseLoaderCount();
          });
      })
      .catch(() => {
        decreaseLoaderCount();
      });
  };

  const songPreview = () => {
    console.log(selectedSong);
    return (
      <div className="preview-wrapper song-wrapper selected">
        <SpotifyPlayer
          songId={{ song: selectedSong }}
          songCount={Math.floor(Math.random() * 1000)}
        />
      </div>
    );
    // return (
    //   <div className="preview-wrapper song-wrapper selected">
    //     <img src={selectedSong?.image} alt=""></img>
    //     <p>{selectedSong?.name}</p>
    //     <span>
    //       <Tooltip title={previewPlayed ? "Pause" : "Play"}>
    //         <IconButton onClick={(e) => playPauseSongPreview()}>
    //           {!previewPlayed ? (
    //             <PlayCircleIcon
    //               className="play-pause-icon"
    //               sx={{
    //                 "&:focus": { outline: "none" },
    //               }}
    //             />
    //           ) : (
    //             <PauseCircleOutlineIcon className="play-pause-icon" />
    //           )}
    //         </IconButton>
    //       </Tooltip>
    //     </span>
    //     <audio className="audio-track" id="preview-audio-track">
    //       <source src={selectedSong?.previewUrl} type="audio/mpeg" />
    //     </audio>
    //   </div>
    // );
  };

  return (
    <>
      {/* <PrimaryButton onClick={() => setShow(true)}>
        Upload a New Image
      </PrimaryButton> */}
      <CustomModal
        show={show}
        header={
          <p
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "24px" }}
          >
            Select A Song
          </p>
        }
        sx={{ border: "none" }}
        body={
          <div className="image-upload-wrapper">
            <ImageUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <AddASong onSongSelected={setSelectedSong} />
            {selectedSong && songPreview()}
          </div>
        }
        primaryButton={<PrimaryButton onClick={onSave}>Save</PrimaryButton>}
        secondaryButton={
          <SecondaryButton
            onClick={() => {
              setSelectedImage(null);
              setSelectedSong(null);
            }}
          >
            Cancel
          </SecondaryButton>
        }
        onHide={() => {
          setShow(false);
          onCancel();
        }}
      />
    </>
  );
};
export default AddAImage;
