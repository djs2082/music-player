import React, { useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton, Tooltip } from "@mui/material";
import './../../css/upload_file.css'

const AddImage = ({ selectedImage, setSelectedImage }) => {
  const inputRef = useRef(null);

  const onFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (files && files[0]) {
      const file = files[0];
      setSelectedImage({
        file: file, // Keep the original file object for upload
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
  };

  const removeSelectedImage = (e) => {
    setSelectedImage(null);
  };


  return (
    <div className="profile-image-container">
      <div
        className="biodata-profile-picture-wrapper"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {selectedImage && (
          <>
            <Tooltip title="Remove the Profile Picture">
              <IconButton
                className="close-btn"
                onClick={(e) => removeSelectedImage(e)}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Tooltip>
            <img
              src={URL.createObjectURL(selectedImage.file)}
              alt={selectedImage.name || "Selected Image"}
              className="biodata-profile-picture"
              style={{ marginBottom: "0" }}
            />
          </>
        )}{" "}
        <input
          id="fileInput"
          className="d-none"
          type="file"
          accept="image/*"
          style={{ display: "none", cursor: "not-allowed" }}
          onChange={onFileChange}
          ref={inputRef}
        />
        <>
          {!selectedImage && (
            <>
              <IconButton
                disableRipple
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "2px",
                  fontSize: "16px",
                  transition:
                    "transform 0.1s ease-in-out, color 0.3s ease-in-out", // Smooth transition
                  "&:hover": {
                    transform: "scale(1.2)", // Grow the icon by 20% on hover
                  },
                }}
              >
                <AddAPhotoIcon
                  sx={{
                    width: "100px",
                    height: "100px",
                    fontSize: "1000px",
                    transition:
                      "transform 0.2s ease-in-out, color 0.3s ease-in-out", // Smooth transition
                    "&:hover": {
                      transform: "scale(1.2)", // Grow the icon by 20% on hover
                    },
                    color: "#64728c",
                  }}
                />

                <p
                  style={{
                    color: "#5E5E5E",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {"Add your photo".toUpperCase()} <br />
                </p>
              </IconButton>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default AddImage;
