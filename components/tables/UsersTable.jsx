import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/system/Box";
import UsersFilter from "../filters/UsersFilter";
import useContextMenu from "../../hooks/useContextMenu";
import { tableStyles } from "@/styles/table_styles";
import useColumns from "@/hooks/useColumns";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { useSelector } from "react-redux";
import CustomTableHead from "./table_heads/CustomTableHead";
import CustomTableBody from "./table_bodies/CustomTableBody";
import useTableUtils from "@/hooks/table_hooks/useTableUtils";
import usePagination from "@/hooks/usePagination";
import dynamic from "next/dynamic";
import TableHelpers from "../table_helpers/TableHelpers";
import MultipleEditModal from "../modals/UserModal_components/MultipleEditModal";
import TotalEntries from "../table_helpers/TotalEntries";

const UsersTableRow = dynamic(() => import("../table_rows/UsersTableRow"));
const UserModal = dynamic(() => import("../modals/UserModal"));
const ErrorModal = dynamic(() => import("../modals/ErrorModal"));
const ContextMenu = dynamic(() => import("../menus/ContextMenu"));

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const UsersTable = () => {
  const { USER_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [allData, setAllData] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [checkboxColumn, setCheckboxColumn] = useState({
    isOpen: false,
    selectedRows: [],
    data: [],
  });
  const [openMultiEditModal, setOpenMultiEditModal] = useState(false);
  const [resetResize, setResetResize] = useState(false);

  //! User Credentials State ▼▼▼▼▼▼
  const { user } = useSelector((state) => state.settings);

  //! Items Data and Relevants ▼▼▼▼▼▼
  const { errorMsg, error, atinaUsers, loading } = useSelector(
    (state) => state.atina
  );
  //! Pagination, Sorting and Filtering State ▼▼▼▼▼▼
  const { paginationParams, sortingParams, filterParams, searchTrigger } =
    useSelector((state) => state.tableUtils.users);

  //#region //! Custom Hooks ▼▼▼▼▼▼
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const { handleSortParams, makeUrlParams, handlePaginationParams } =
    usePagination("users");

  const { getAtinaRoleDefinitions, getUsersData } = useAtinaCalls();

  const tableColumns = useMemo(() => USER_TABLE_COLUMNS, []);
  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 200,
      maxWidth: 600,
    }),
    []
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

  useEffect(() => {
    const params = makeUrlParams();
    getUsersData(params + filterParams);
  }, [paginationParams, sortingParams, filterParams, searchTrigger]);

  useEffect(() => {
    if (!atinaUsers?.entries) return;
    setAllData(atinaUsers?.entries);
  }, [atinaUsers]);
  useEffect(() => {
    getAtinaRoleDefinitions();
    const x = localStorage.getItem("hiddenColumns/users");
    setHiddenColumns(JSON.parse(x));
  }, []);
  return (
    <>
      <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
      />
      <MultipleEditModal
        setOpenModal={setOpenMultiEditModal}
        openModal={openMultiEditModal}
        checkboxColumn={checkboxColumn}
      />
      {/* {loading && <Loading />} */}
      {error && <ErrorModal error={errorMsg} />}
      {contextMenu.show && (
        <ContextMenu
          allColumns={allColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenUserModal}
          setOpenColumn={setCheckboxColumn}
          openColumn={checkboxColumn}
          setOpenMultiEditModal={setOpenMultiEditModal}
          tableColumns={tableColumns}
          state={state}
          table="users"
        />
      )}
      <TableContainer component={Paper} sx={tableStyles.tableContainer}>
        <UsersFilter />

        <Box sx={tableStyles.helpersWrapper}>
          <TotalEntries totalEntries={atinaUsers?.totalEntries} />
          <TableHelpers
            resetResizing={resetResizing}
            setResetResize={setResetResize}
            setOpenModal={setOpenUserModal}
            table={"users"}
            fileName="benutzer"
          />
        </Box>

        <Table
          {...getTableProps()}
          sx={{ minWidth: 650, position: "relative" }}
          // sx={{ minWidth: 650, minHeight: 650, position: "relative" }}
          aria-label="simple table"
          size="small"
        >
          <CustomTableHead
            headerGroups={headerGroups}
            resetResize={resetResize}
            setResetResize={setResetResize}
            handleRightClick={handleRightClick}
            handleSortParams={handleSortParams}
            checkboxColumn={checkboxColumn}
            setCheckboxColumn={setCheckboxColumn}
            table={"users"}
          />
          <CustomTableBody
            resetResize={resetResize}
            getTableBodyProps={getTableBodyPropsMemo}
            prepareRow={prepareRow}
            page={page}
            TableRow={UsersTableRow}
            handleRightClick={handleRightClick}
            checkboxColumn={checkboxColumn}
            setCheckboxColumn={setCheckboxColumn}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
