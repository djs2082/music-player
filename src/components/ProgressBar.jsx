import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./../css/progress_bar.css";
import useUtilStore from "../services/useUtilStore";

function ProgressBar(props) {
  const { uploadProgress } = useUtilStore();
  if (uploadProgress === 0) return <></>;
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      height="30px"
      width="100%"
    >
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={uploadProgress} />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body1"
          sx={{ color: "white" }}
          // color="textPrimary"
        >
          <p style={{ color: "white", marginTop: "16px" }}>{`${Math.round(
            uploadProgress
          )}% Uploaded...`}</p>
        </Typography>
      </Box>
    </Box>
  );
}

export default ProgressBar;
