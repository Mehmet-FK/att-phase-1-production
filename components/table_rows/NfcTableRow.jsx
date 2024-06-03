import { tableStyles } from "@/styles/table_styles";
import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import NfcTagsModal from "../modals/NfcTagsModal";

const NfcTableRow = ({ row, prepareRow, resetResize }) => {
  const [openNfcModal, setOpenNfcModal] = useState(false);

  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenNfcModal(true);
    }
  };

  useEffect(() => {
    prepareRow(row);
  }, [resetResize, row]);

  return (
    <>
      <NfcTagsModal
        openNfcModal={openNfcModal}
        setOpenNfcModal={setOpenNfcModal}
        nfcData={row?.original}
      />
      <TableRow
        {...row.getRowProps()}
        // className={styles.tr}
        sx={tableStyles.tr.row}
        onClick={handleDblClick}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              {...cell.getCellProps()}
              sx={tableStyles.tr.cell}
              // className={styles.td}
              align="left"
              size="small"
              scope="row"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default NfcTableRow;
