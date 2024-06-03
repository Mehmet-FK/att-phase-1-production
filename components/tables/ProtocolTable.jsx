import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import ContextMenu from "../menus/ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import Tooltip from "@mui/material/Tooltip";
import { tableStyles } from "@/styles/table_styles";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { useSelector } from "react-redux";
import useColumns from "@/hooks/useColumns";
import ErrorModal from "../modals/ErrorModal";
import CustomTableHead from "./table_heads/CustomTableHead";
import CustomTableBody from "./table_bodies/CustomTableBody";
import useTableUtils from "@/hooks/table_hooks/useTableUtils";
import Pagination from "../Pagination";
import usePagination from "@/hooks/usePagination";
import Loading_Icon from "../Loading_Icon";
import ProtocolTableRow from "../table_rows/ProtocolTableRow";
import ProtocolFilter from "../filters/ProtocolFilter";
import { Box } from "@mui/material";
import TotalEntries from "../table_helpers/TotalEntries";

// import axios from "axios";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const ProtocolTable = () => {
  const { PROTOCOL_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [allData, setAllData] = useState([]);
  const [resetResize, setResetResize] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  //! User Credentials State ▼▼▼▼▼▼
  const { user } = useSelector((state) => state.settings);
  //! Bookings Data and Relevants ▼▼▼▼▼▼
  const { errorMsg, error, protocol, loading } = useSelector(
    (state) => state.atina
  );

  //! Pagination, Sorting and Filtering State ▼▼▼▼▼▼
  const { paginationParams, sortingParams, filterParams, searchTrigger } =
    useSelector((state) => state.tableUtils.protocol);

  //#region //! Custom Hooks ▼▼▼▼▼▼
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const { getProtocolData } = useAtinaCalls();

  const { handleSortParams, makeUrlParams, handlePaginationParams } =
    usePagination("protocol");

  const defaultColumn = useMemo(
    () => ({
      minWidth: 75,
      width: 225,
      maxWidth: 400,
    }),
    []
  );
  const tableColumns = useMemo(() => PROTOCOL_TABLE_COLUMNS, [hiddenColumns]);
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTableUtils(tableColumns, allData, defaultColumn, hiddenColumns);
  //#endregion //! Custom Hooks ▲▲▲▲▲▲

  const getTableBodyPropsMemo = useCallback(() => getTableBodyProps(), []);

  //#region ===Table Filter START===

  //#endregion

  useEffect(() => {
    const params = makeUrlParams();
    getProtocolData(params + filterParams);
  }, [paginationParams, sortingParams, filterParams, searchTrigger]);

  useEffect(() => {
    if (!protocol?.entries) return;
    setAllData(protocol?.entries);
  }, [protocol]);

  useEffect(() => {
    // getBookingTypes();
    const x = localStorage.getItem("hiddenColumns/protocol");
    setHiddenColumns(JSON.parse(x));
  }, []);

  return (
    <>
      {error && <ErrorModal error={errorMsg} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {contextMenu.show && (
          <ContextMenu
            allColumns={allColumns}
            X={contextMenu.x}
            Y={contextMenu.y}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            tableColumns={tableColumns}
            state={state}
          />
        )}
        <TableContainer component={Paper} sx={tableStyles.tableContainer}>
          <ProtocolFilter />

          <Box
            sx={{
              ...tableStyles.helpersWrapper,
              justifyContent: "space-between",
            }}
          >
            <TotalEntries totalEntries={protocol?.totalEntries} />

            <div style={{ display: "flex" }}>
              {loading && <Loading_Icon />}
              <Pagination
                paginationParams={paginationParams}
                totalPages={protocol?.totalPages}
                table={"protocol"}
              />

              <Tooltip title="Spaltengröße rückgängig machen" arrow>
                <IconButton
                  onClick={() => {
                    resetResizing();
                    setResetResize(!resetResize);
                  }}
                >
                  <UndoIcon />
                </IconButton>
              </Tooltip>

              <DownloadCSV
                rawData={allData}
                fileName={"protokolle"}
                table="protocol"
              />
            </div>
          </Box>
          <Table
            {...getTableProps()}
            sx={{ minWidth: 650, minHeight: 650, position: "relative" }}

            // onContextMenu={handleRightClick}
          >
            <CustomTableHead
              headerGroups={headerGroups}
              resetResize={resetResize}
              setResetResize={setResetResize}
              handleRightClick={handleRightClick}
              handleSortParams={handleSortParams}
              table={"protocol"}
            />
            <CustomTableBody
              resetResize={resetResize}
              getTableBodyProps={getTableBodyPropsMemo}
              prepareRow={prepareRow}
              page={page}
              TableRow={ProtocolTableRow}
              handleRightClick={handleRightClick}
            />
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ProtocolTable;
