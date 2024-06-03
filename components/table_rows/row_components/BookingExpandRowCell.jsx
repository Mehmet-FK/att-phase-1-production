import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { tableStyles } from "@/styles/table_styles";
const BookingExpandRowCell = ({ cell, row, open, handleOpen }) => {
  return (
    <TableCell
      {...cell.getCellProps()}
      sx={{
        ...tableStyles.tr.cell,
        display: "flex",
        p: 0,
        alignItems: "center",
        position: "relative",
        // border: "1px solid red",
      }}
    >
      <IconButton
        aria-label="expand row"
        size="small"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: " translate(-50%, -50%)",
        }}
        onClick={handleOpen}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>

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
      </span>
    </TableCell>
  );
};

export default BookingExpandRowCell;
