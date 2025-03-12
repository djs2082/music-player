import React, { useState } from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import CustomModal from "./Modals/Modal";
import SelectSongList from "./SelectSongList";
import InputBox from "./InputBox";

const AddASong = ({ onSongSelected, selectedSong }) => {
  const [show, setShow] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const tracks = localStorage.getItem("tracks");
  const parsedTracks = tracks ? JSON.parse(tracks).reverse() : null;
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "1.5rem",
      }}
    >
      <PrimaryButton onClick={() => setShow(true)}>{`${
        selectedSong ? "Edit" : "Add"
      } a Song`}</PrimaryButton>
      <CustomModal
        bodyStyle={{ display: "flex", flexDirection: "column" }}
        show={show}
        header={
          <p
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "24px" }}
          >
            Select A Song
          </p>
        }
        sx={{ border: "none", display: "flex", flexDirection: "column" }}
        body={
          <>
            <div style={{ width: "100%", maxWidth: "300px" }}>
              <InputBox
                sx={{ width: "100%", marginBottom: "16px" }}
                label="Location"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <InputBox
                sx={{ width: "100%", marginBottom: "16px" }}
                label="Enter Date"
                placeholder="DD/MM/YYYY"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            {parsedTracks && (
              <SelectSongList
                songs={parsedTracks}
                selectedTrack={selectedTrack}
                setSelectedTrack={setSelectedTrack}
              />
            )}
          </>
        }
        onHide={() => {
          onSongSelected(selectedTrack, location, date);
          setShow(false);
        }}
      />
    </div>
  );
};
export default AddASong;
