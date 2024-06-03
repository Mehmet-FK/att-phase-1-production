import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemsModal from "../modals/ItemsModal";
import ConfirmDialog from "../ConfirmDialog";
import styles from "./table_row_styles.module.css";
import EditDeleteCells from "./row_components/EditDeleteCells";

const ItemsTableRow = ({ row, prepareRow, resetResize }) => {
  const [openItemsModal, setOpenItemsModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenItemsModal(true);
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, [resetResize]);

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        data={row?.original}
      />
      <ItemsModal
        setOpenItemsModal={setOpenItemsModal}
        openItemsModal={openItemsModal}
        item={row?.original}
        type={row?.original?.itemType}
      />
      <TableRow
        className={styles.tr}
        {...row.getRowProps()}
        onClick={handleDblClick}
        sx={tableStyles.tr.row}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              className={styles.td}
              {...cell.getCellProps()}
              sx={{ ...tableStyles.tr.cell, wordBreak: "break-word" }}
              align="left"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}

        {/* <EditDeleteCells
          setOpenModal={setOpenItemsModal}
          setOpenDialog={setOpenDialog}
        /> */}
      </TableRow>
    </>
  );
};

export default ItemsTableRow;
