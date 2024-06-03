import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Collapse } from "@mui/material";

const SqlEditorTableSkeleton = ({ loading }) => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const headers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <Collapse
      component="span"
      sx={{
        width: "100%",
        position: "absolute",
        height: "60vh",
        left: 0,
        opacity: loading ? 1 : 0,
        transition: "0.5s",

        // filter: "blur(1px)",
      }}
      in={loading}
      timeout={350}
      unmountOnExit
    >
      {rows.map((row) => (
        <Box
          component="span"
          key={row}
          sx={{
            // borderRight: "0.5px solid #99999944",
            // width: `100vw`,
            // height: 58,
            // p: 1,
            diplay: "grid",
            placeItems: "center",
            borderBottom: "0.5px solid #99999944",
          }}
        >
          <Box component="span" sx={{ display: "flex" }}>
            {headers.map((cell) => (
              <Box
                component="span"
                key={cell}
                sx={{
                  borderRight: "0.5px solid #99999944",
                  width: 80,
                  // height: 58,
                  diplay: "grid",
                  placeItems: "center",
                  p: 1,
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "0.4rem", width: "80%" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "0.4rem", width: "60%" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "0.4rem", width: "40%" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Collapse>
  );
};

export default SqlEditorTableSkeleton;
