import { Box, LinearProgress } from "@mui/material";
import React from "react";

const LoadingBar = ({ progress }) => {
  /*  setProgress((oldProgress) => {
    if (oldProgress === 100) {
      return 0;
    }
    const diff = Math.random() * 10;
    return Math.min(oldProgress + diff, 100);
  }); */

  return (
    <Box sx={{ width: "100%", position: "absolute", bottom: "5px" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default LoadingBar;
