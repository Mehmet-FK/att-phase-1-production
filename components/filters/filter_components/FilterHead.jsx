import React, { memo } from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import { filterStyles } from "@/styles/filter_styles";

const FilterHead = ({ open, setOpen, pageTitle }) => {
  return (
    <Box
      sx={{
        ...filterStyles.iconWrapper,
        cursor: "pointer",
        // border: "2px solid red",
        justifyContent: "space-between",
      }}
      onClick={() => setOpen(!open)}
    >
      <h2 style={{ fontSize: "1rem", paddingInline: "1rem" }}>
        {" "}
        <em>{pageTitle}</em>
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={12}
          sx={{ display: open && "none", width: open ? "0px" : "auto" }}
        >
          Suche öffnen
        </Typography>
        <IconButton>
          <Typography sx={filterStyles.icon}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Typography>
        </IconButton>
      </div>
    </Box>
  );
};

export default memo(FilterHead);
