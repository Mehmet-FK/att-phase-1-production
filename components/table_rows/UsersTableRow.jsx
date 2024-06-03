import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect, useState } from "react";
// import UserModal from "../modals/UserModal";
import { tableStyles } from "@/styles/table_styles";
// import ConfirmDialog from "../ConfirmDialog";
import EditDeleteCells from "./row_components/EditDeleteCells";
import dynamic from "next/dynamic";
import { Checkbox, Collapse } from "@mui/material";

const ConfirmDialog = dynamic(() => import("../ConfirmDialog"));
const UserModal = dynamic(() => import("../modals/UserModal"));

const UsersTableRow = ({
  row,
  prepareRow,
  resetResize,
  checkboxColumn,
  setCheckboxColumn,
}) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
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
            row.original.userInfo.id,
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
            ...prev.data.filter(
              (u) => u.userInfo.id !== Number(e.target.value)
            ),
          ],
        }));
      }
    },
    [checkboxColumn]
  );

  useEffect(() => {
    prepareRow(row);
  }, [resetResize, row]);

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        data={row?.original}
      />
      <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
        userInfo={row.original}
      />
      <TableRow
        {...row.getRowProps()}
        sx={{
          ...tableStyles.tr.row,
          backgroundColor:
            checkboxColumn.selectedRows.includes(row?.original?.userInfo?.id) &&
            "#bbbb",
        }}
        onClick={handleDblClick}
      >
        <Collapse
          sx={{ p: 0 }}
          orientation="horizontal"
          in={checkboxColumn.isOpen}
        >
          <TableCell
            sx={{ ...tableStyles.tr.cell, width: "5rem", textAlign: "center" }}
          >
            {" "}
            <Checkbox
              color="primary"
              sx={{ p: 0 }}
              value={row?.original?.userInfo?.id}
              checked={checkboxColumn.selectedRows.includes(
                row?.original?.userInfo?.id
              )}
              onClick={selectRow}
            />
          </TableCell>
        </Collapse>

        {row.cells.map((cell) => {
          return (
            <TableCell
              {...cell.getCellProps()}
              sx={tableStyles.tr.cell}
              align="left"
              scope="row"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}
        {/* <EditDeleteCells
          setOpenModal={setOpenUserModal}
          setOpenDialog={setOpenDialog}
        /> */}
      </TableRow>
    </>
  );
};

export default UsersTableRow;
