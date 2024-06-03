import { Checkbox, Collapse, TableCell, TableRow } from "@mui/material";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import BookingsModal from "../modals/BookingsModal";
import { tableStyles } from "@/styles/table_styles";
import styles from "./table_row_styles.module.css";
import BookingImageRow from "./row_components/BookingImageRow";
import ExpandRowCell from "./row_components/BookingExpandRowCell";

const BookingsTableRow = ({
  resetResize,
  row,
  prepareRow,
  checkboxColumn,
  setCheckboxColumn,
}) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenBookingModal(true);
    }
  };

  const selectRow = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.target.checked) {
        setCheckboxColumn({
          ...checkboxColumn,
          selectedRows: [
            ...checkboxColumn.selectedRows,
            row.original.BookingID,
          ],
          data: [...checkboxColumn.data, row.original],
        });
      } else {
        setCheckboxColumn((prev) => ({
          ...prev,
          selectedRows: [
            ...prev.selectedRows.filter((x) => x !== Number(e.target.value)),
          ],
          data: [
            ...prev.data.filter((m) => m.BookingID !== Number(e.target.value)),
          ],
        }));
      }
    },
    [checkboxColumn]
  );

  useEffect(() => {
    prepareRow(row);
  }, [resetResize]);
  useEffect(() => {
    setOpen(false);
  }, [row]);

  return (
    <>
      <BookingsModal
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
        booking={row?.original}
      />
      <TableRow
        {...row.getRowProps()}
        sx={{
          ...tableStyles.tr.row,

          backgroundColor:
            checkboxColumn.selectedRows.includes(row?.original?.BookingID) &&
            "#bbbb",
        }}
        onClick={handleDblClick}
      >
        <Collapse
          component={"td"}
          sx={{ display: "table-cell" }}
          orientation="horizontal"
          in={checkboxColumn.isOpen}
        >
          <TableCell
            size="small"
            sx={{
              ...tableStyles.tr.cell,
              width: "5rem",
              textAlign: "center",
            }}
          >
            <Checkbox
              color="primary"
              sx={{ p: 0 }}
              value={row?.original?.BookingID}
              checked={checkboxColumn.selectedRows.includes(
                row?.original?.BookingID
              )}
              onClick={selectRow}
            />
          </TableCell>
        </Collapse>

        {row.cells.map((cell, i) => (
          <Fragment key={i}>
            {cell.getCellProps().key.includes("FileCounter") ? (
              <ExpandRowCell
                cell={cell}
                row={row}
                open={open}
                handleOpen={handleOpen}
              />
            ) : (
              <TableCell
                {...cell.getCellProps()}
                sx={tableStyles.tr.cell}
                // className={styles.td}
                align="left"
                size="small"
              >
                {cell.render("Cell")}
              </TableCell>
            )}
          </Fragment>
        ))}
      </TableRow>
      <BookingImageRow row={row} open={open} />
    </>
  );
};

export default BookingsTableRow;
/*   return (
              <TableCell
                {...cell.getCellProps()}
                sx={{
                  ...tableStyles.tr.cell,
                  display: "flex",
                  p: 0.3,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  aria-label="expand row"
                  sx={{
                    position: "relative",
                    left: "50%",
                    transform: " translate(-50%, 0)",
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
                    backgroundColor:
                      row?.original?.Files?.length > 0 ? "#e14343cc" : "#888d",
                    fontSize: "0.6rem",
                    position: "absolute",
                    left: "57%",
                    top: 3,
                  }}
                >
                  {cell.render("Cell")}
                </span>
              </TableCell>
            ); */
