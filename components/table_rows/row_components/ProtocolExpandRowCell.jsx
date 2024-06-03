import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { tableStyles } from "@/styles/table_styles";
import { Typography } from "@mui/material";
const ProtocolExpandRowCell = ({ cell, row, open, handleOpen }) => {
  return (
    <TableCell
      {...cell.getCellProps()}
      sx={{
        ...tableStyles.tr.cell,
        display: "flex",
        p: 0.3,
        alignItems: "center",
        position: "relative",
        color: "#0000",
        "&:hover": {
          color: "#000",
        },
      }}
    >
      <IconButton
        aria-label="expand row"
        size="small"
        sx={{
          position: "absolute",
          // left: "50%",
          right: "5px",
          top: "50%",
          transform: " translate(0, -50%)",
          color: "inherit",
          "&:hover": {
            backgroundColor: "#C5c5c5cc",
          },
        }}
        onClick={handleOpen}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Typography variant={"p"} color={"dateInputColor.main"}>
        {cell.render("Cell")}
      </Typography>
      {/* 
      <span
        style={{
          padding: 0,
          display: "grid",
          placeItems: "center",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          color: "#fff",
          backgroundColor: cell?.value > 0 ? "#e14343cc" : "#888d",
          fontSize: "0.6rem",
          position: "absolute",
          left: "57%",
          top: 3,
        }}
      >
        {cell.render("Cell")}
      </span> */}
    </TableCell>
  );
};

export default ProtocolExpandRowCell;
