import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
const useTableUtils = (
  tableColumns,
  allData,
  defaultColumn,
  hiddenColumns,
  initialState
) => {
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    // page,
    // canPreviousPage,
    // canNextPage,
    // setPageSize,
    // gotoPage,
    // pageOptions,
    // nextPage,
    // previousPage,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTable(
    {
      columns: tableColumns,
      data: allData,
      initialState: {
        pageIndex: 0,
        pageSize: 25,
        hiddenColumns,
      },
      defaultColumn,
      isMultiSortEvent: (e) => {
        if (e.ctrlKey) return true;
      },
    },
    useSortBy,
    // usePagination,
    useBlockLayout,
    useResizeColumns
  );

  return {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page: rows,
    // canPreviousPage,
    // canNextPage,
    // setPageSize,
    // gotoPage,
    // pageOptions,
    // nextPage,
    // previousPage,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  };
};

export default useTableUtils;
