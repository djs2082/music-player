import React, { useState } from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import CustomModal from "./Modals/Modal";
import SelectSongList from "./SelectSongList";

const AddASong = ({ onSongSelected }) => {
  const [show, setShow] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const tracks = localStorage.getItem("tracks");
  const parsedTracks = tracks ? JSON.parse(tracks) : null;

  return (
    <>
      <PrimaryButton onClick={() => setShow(true)}>Add a Song</PrimaryButton>
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
          parsedTracks && (
            <SelectSongList
              songs={parsedTracks}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
            />
          )
        }
        onHide={() => {
          onSongSelected(selectedTrack);
          setShow(false);
        }}
      />
    </>
  );
};
export default AddASong;