import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import Loading_Icon from "../Loading_Icon";
import Pagination from "../Pagination";
import UndoIcon from "@mui/icons-material/Undo";
import DownloadCSV from "../DownloadCSV";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { tableStyles } from "@/styles/table_styles";
import { useSelector } from "react-redux";

const TableHelpers = ({
  resetResizing,
  setResetResize,
  setOpenModal,
  table,
  fileName,
}) => {
  const { atinaUsers, loading } = useSelector((state) => state.atina);
  const { paginationParams } = useSelector((state) => state.tableUtils[table]);
  const { user } = useSelector((state) => state.settings);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      {loading && <Loading_Icon />}
      <Pagination
        paginationParams={paginationParams}
        totalPages={atinaUsers?.totalPages}
        table={table}
      />
      <Tooltip title="Spaltengröße rückgängig machen" arrow>
        <IconButton
          onClick={() => {
            resetResizing();
            setResetResize((prev) => !prev);
          }}
        >
          <UndoIcon />
        </IconButton>
      </Tooltip>
      <DownloadCSV
        rawData={atinaUsers?.entries}
        fileName={fileName}
        table={table}
      />

      {user?.isAdmin && (
        <Tooltip title="Neuen Datensatz anlegen" arrow>
          <IconButton onClick={() => setOpenModal(true)}>
            <AddCircleIcon
              sx={{
                borderRadius: "10px",
                color: "green",
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default TableHelpers;
