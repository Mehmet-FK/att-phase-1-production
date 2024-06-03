import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Collapse } from "@mui/material";

const TableSkeleton = ({ page, loading }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    // <Fade in={loading} timeout={450}>
    <Collapse
      sx={{
        // width: "100%",
        position: "absolute",
        height: "60vh",
        left: 0,
        opacity: loading ? 1 : 0,
        transition: "0.7s",
        // filter: "blur(1px)",
      }}
      in={loading}
      timeout={350}
      unmountOnExit
    >
      {/* <Box
        sx={{
          width: "100%",
          position: "absolute",
          height: "60vh",
          left: 0,
          opacity: !loading ? 1 : 0,
          transition: "0.7s",
        }}
      > */}
      {arr.map((row, i) => (
        <Box
          key={i}
          sx={{
            // borderRight: "0.5px solid #99999944",
            // width: `100vw`,
            height: 58,
            diplay: "grid",
            placeItems: "center",
            // p: 1.5,
          }}
        >
          {/* <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "0.5rem", width: "90%" }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "0.5rem", width: "85%" }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "0.5rem", width: "50%" }}
          /> */}

          <Box key={i} sx={{ display: "flex" }}>
            {page[0]?.cells?.map((cell, i) => (
              <Box
                key={i}
                sx={{
                  borderRight: "0.5px solid #99999944",
                  width: cell?.column?.width,
                  height: 58,
                  diplay: "grid",
                  placeItems: "center",
                  // p: 1.5,
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
    // </Fade>
  );
};

export default TableSkeleton;
{
  /* <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => (
            <TableRow key={i} {...row?.getRowProps()}>
              {row?.cells?.map((cell, i) => (
                <TableCell
                  key={i}
                  sx={{ borderRight: "1px solid #999" }}
                  {...cell?.getCellProps()}
                >
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "0.5rem" }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ fontSize: "0.5rem", width: "50%" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody> */
}
