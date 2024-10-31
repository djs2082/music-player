import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SpinnerImage from "./../images/spinner.gif";
import "./../css/loader.css";
import useUtilStore from "../services/useUtilStore";
import ProgressBar from "./ProgressBar";

const modalDefaultStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  padding: "10px",
  width: "100%",
  Height: "100%",
  background: "rgba(0,0,0,0.2)",
  boxShadow: "none",
};

const Loader = (props) => {
  const { loaderCount, uploadProgress } = useUtilStore();
  if (loaderCount <= 0) return <></>;
  return (
    <div className="modal-box">
      <Modal open>
        <Box className="loader-modal-box-wrapper" sx={{ modalDefaultStyle }}>
          <div className="loader-modal-details">
            <img
              src={SpinnerImage}
              alt="Loading..."
              className="spinner-image"
            />
            {uploadProgress > 0 ? <ProgressBar value={props.value} /> : ""}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Loader;
