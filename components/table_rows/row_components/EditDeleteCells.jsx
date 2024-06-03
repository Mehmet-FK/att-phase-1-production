import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const EditDeleteCells = ({ setOpenModal, setOpenDialog }) => {
  const { user } = useSelector((state) => state.settings);

  // useEffect(() => {}, [user]);

  return (
    <>
      {user?.isAdmin && (
        <>
          <TableCell
            sx={{ borderRight: "1px solid #ddd", minWidth: "70px" }}
            align="left"
            scope="row"
          >
            <Tooltip title="Bearbeiten" arrow>
              <IconButton onClick={() => setOpenModal(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell
            sx={{ borderRight: "1px solid #ddd", minWidth: "70px" }}
            align="left"
            scope="row"
          >
            <Tooltip title="Löschen" arrow>
              <IconButton onClick={() => setOpenDialog(true)}>
                <DeleteForeverIcon fontSize="small" sx={{ color: "#ff0000" }} />
              </IconButton>
            </Tooltip>
          </TableCell>
        </>
      )}
    </>
  );
};

export default EditDeleteCells;
