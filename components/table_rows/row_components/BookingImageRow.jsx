import BookingImages from "./BookingImages";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { memo } from "react";

const BookingImageRow = ({ row, open }) => {
  return (
    <TableRow>
      <TableCell sx={{ border: "none", p: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div
            style={{
              // padding: 15,
              padding: "0.8rem 0",
              maxHeight: "12rem",
              overflow: "auto",
              maxWidth: "90vw",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: "10px",
            }}
          >
            {row?.original?.Files?.map((item, i) => (
              <BookingImages
                key={i}
                file={item}
                fileArr={row?.original?.Files}
                index={i}
              />
            ))}
          </div>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default memo(BookingImageRow);
