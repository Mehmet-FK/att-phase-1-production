import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookingsFilter from "../filters/BookingsFilter";
import ContextMenu from "../menus/ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import Tooltip from "@mui/material/Tooltip";
import { tableStyles } from "@/styles/table_styles";
import BookingsTableRow from "../table_rows/BookingsTableRow";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookingsModal from "../modals/BookingsModal";
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
import useFilters from "@/hooks/useFilters";
import { Box, Collapse, Fade } from "@mui/material";
import TableSkeleton from "../skeleton/TableSkeleton";
import TotalEntries from "../table_helpers/TotalEntries";

// import axios from "axios";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
  point: "",
};

const MobileBookings = () => {
  const { BUCHUNGEN_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [allData, setAllData] = useState([]);
  const [resetResize, setResetResize] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const [checkboxColumn, setCheckboxColumn] = useState({
    isOpen: false,
    selectedRows: [],
    data: [],
  });

  //! User Credentials State ▼▼▼▼▼▼
  const { user } = useSelector((state) => state.settings);
  //! Bookings Data and Relevants ▼▼▼▼▼▼
  const { bookingTypes, errorMsg, error, mobileBookings, loading } =
    useSelector((state) => state.atina);

  //! Pagination, Sorting and Filtering State ▼▼▼▼▼▼
  const { paginationParams, sortingParams, filterParams, searchTrigger } =
    useSelector((state) => state.tableUtils.bookings);

  //#region //! Custom Hooks ▼▼▼▼▼▼
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const { getBookingTypes, getMobileBookingsData } = useAtinaCalls();
  const { handleSortParams, makeUrlParams, handlePaginationParams } =
    usePagination("bookings");

  const defaultColumn = useMemo(
    () => ({
      minWidth: 75,
      width: 130,
      maxWidth: 400,
    }),
    []
  );
  const tableColumns = useMemo(
    () => BUCHUNGEN_TABLE_COLUMNS,
    [bookingTypes, hiddenColumns]
  );
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
    getMobileBookingsData(params + filterParams);
  }, [paginationParams, sortingParams, filterParams, searchTrigger]);

  useEffect(() => {
    if (!mobileBookings?.entries) return;
    setAllData(mobileBookings?.entries);
  }, [mobileBookings]);

  useEffect(() => {
    getBookingTypes();
    const x = localStorage.getItem("hiddenColumns/mobile-bookings");
    setHiddenColumns(JSON.parse(x));
  }, []);

  return (
    <>
      <BookingsModal
        openBookingModal={openBookingModal}
        setOpenBookingModal={setOpenBookingModal}
      />

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
            setOpenModal={setOpenBookingModal}
            setOpenColumn={setCheckboxColumn}
            openColumn={checkboxColumn}
            tableColumns={tableColumns}
            state={state}
            table="bookings"
          />
        )}
        <TableContainer component={Paper} sx={tableStyles.tableContainer}>
          <BookingsFilter />

          <Box
            sx={{
              ...tableStyles.helpersWrapper,
              justifyContent: "space-between",
            }}
          >
            <TotalEntries totalEntries={mobileBookings?.totalEntries} />
            <div style={{ display: "flex" }}>
              {loading && <Loading_Icon />}

              <Pagination
                paginationParams={paginationParams}
                totalPages={mobileBookings?.totalPages}
                table={"bookings"}
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
                fileName={"mobile_buchungen"}
                table="bookings"
              />
              {user?.isAdmin && (
                <Tooltip title="Neuen Datensatz anlegen" arrow>
                  <IconButton onClick={() => setOpenBookingModal(true)}>
                    <AddCircleIcon
                      sx={{
                        borderRadius: "10px",
                        color: "green",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Box>

          <Table
            {...getTableProps()}
            sx={{ minWidth: 650, position: "relative" }}
            // sx={{ minWidth: 650, minHeight: 650, position: "relative" }}
          >
            <CustomTableHead
              headerGroups={headerGroups}
              resetResize={resetResize}
              setResetResize={setResetResize}
              handleRightClick={handleRightClick}
              handleSortParams={handleSortParams}
              checkboxColumn={checkboxColumn}
              setCheckboxColumn={setCheckboxColumn}
              table={"bookings"}
            />
            <CustomTableBody
              resetResize={resetResize}
              getTableBodyProps={getTableBodyPropsMemo}
              prepareRow={prepareRow}
              page={page}
              TableRow={BookingsTableRow}
              handleRightClick={handleRightClick}
              checkboxColumn={checkboxColumn}
              setCheckboxColumn={setCheckboxColumn}
            />
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MobileBookings;
