import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";

const reasonsToAvoidModalHide = ["backdropClick", "escapeKeyDown"];

const modalDefaultStyle = {
  position: "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: `1px solid #e5eef1`,
  padding: "10px",
  boxShadow:
    "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 20px 20px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
};

const CustomModal = ({
  show,
  onHide,
  header,
  body,
  className,
  primaryButton,
  secondaryButton,
  style,
  bodyStyle,
}) => {
  const handleClose = (reason) => {
    if (reason && reasonsToAvoidModalHide.includes(reason)) return;
    onHide();
  };

  return (
    <div className="modal-box">
      <Modal open={show} onClose={handleClose} className={className}>
        <Box
          className="modal-box-wrapper"
          sx={{ ...modalDefaultStyle, ...style }}
        >
          {/* modal Header */}
          <div id="modal-header-content" className="modal-header-content">
            <span id="modal-close-button" className="modal-close-button">
              <IconButton onClick={onHide}>
                <CloseIcon />
              </IconButton>
            </span>
          </div>
          {/* modal content */}
          <div className="modal-details">
            {/* modal image and content */}
            <div id="modal-content" className="modal-content">
              <div
                id="modal-text-and-icon"
                className="modal-text-and-icon"
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "24px",
                }}
              >
                <span
                  id="modal-text"
                  className="modal-text"
                  style={{
                    width: "100%",
                  }}
                >
                  <span
                    id="modal-content-header"
                    className="modal-content-header"
                    style={{ textAlign: "center" }}
                  >
                    {header}
                  </span>

                  <span
                    id="modal-content-body"
                    className="modal-content-body"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "24px",
                      justifyContent: "center",
                      alignItems: "center",
                      ...bodyStyle,
                    }}
                  >
                    {body}
                  </span>
                </span>
              </div>
            </div>
            {/* modal content buttons */}
            <div
              id="modal-buttons"
              className="modal-buttons"
              style={{
                flexDirection: "row",
                gap: "24px",
              }}
            >
              {primaryButton}
              {secondaryButton}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
  // return <></>;
};

export default CustomModal;
