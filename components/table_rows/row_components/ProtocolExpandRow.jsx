import BookingImages from "./BookingImages";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment, memo } from "react";

const ProtocolExpandRow = ({ row, open }) => {
  return (
    <TableRow>
      <TableCell sx={{ border: "none", p: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <p style={{ padding: "1rem", fontSize: "0.7rem" }}>
            {row?.original?.description?.split("\n").map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default memo(ProtocolExpandRow);
