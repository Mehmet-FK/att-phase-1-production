import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPageSize,
  setSortType,
} from "@/redux/slices/tableUtilsSlice";

const usePagination = (table) => {
  const dispatch = useDispatch();
  const { mobileBookings, atinaItems } = useSelector((state) => state.atina);

  const { sortingParams, paginationParams, filterParams } = useSelector(
    (state) => state.tableUtils[table]
  );

  const makeUrlParams = () => {
    let fields = "";
    let directions = "";

    if (Object.keys(sortingParams).length) {
      fields = Object.keys(sortingParams).join("%7C");
      directions = Object.values(sortingParams).join("%7C");
    }

    let PARAMS = `pageNumber=${paginationParams.currentPage}&pageSize=${paginationParams.pageSize}&sortingFields=${fields}&sortingDirections=${directions}`;
    if (PARAMS.includes("userInfo.")) {
      PARAMS = PARAMS.replaceAll("userInfo.", "");
    }

    const PAGI_STRING = `pageNumber=${paginationParams.currentPage}&pageSize=${paginationParams.pageSize}`;
    const SORT_STRING = `pageNumber=${paginationParams.currentPage}&pageSize=${paginationParams.pageSize}`;
    // dispatch(makePaginationParamsString({ str: PAGI_STRING }));
    // dispatch(makeSortParamsString({ str: SORT_STRING }));

    return PARAMS;
  };

  //! SORT HANDLING FUNCTIONS

  const singleSort = (column) => {
    if (!sortingParams[column.id]) {
      const tempObj = { [column.id]: "asc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else if (sortingParams[column.id] === "asc") {
      const tempObj = { [column.id]: "desc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else {
      const tempObj = { ...sortingParams };
      delete tempObj[column.id];
      dispatch(setSortType({ field: {}, table }));
    }
  };

  const multiSort = (column) => {
    if (!sortingParams[column.id]) {
      const tempObj = { ...sortingParams, [column.id]: "asc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else if (sortingParams[column.id] === "asc") {
      const tempObj = { ...sortingParams, [column.id]: "desc" };
      dispatch(setSortType({ field: tempObj, table }));
    } else {
      const tempObj = { ...sortingParams, [column.id]: null };
      dispatch(setSortType({ field: tempObj, table }));
    }
  };

  const handleSortParams = (column, e) => {
    if (e.ctrlKey) {
      multiSort(column);
    } else {
      singleSort(column);
    }
  };

  //! PAGINATION HANDLING FUNCTIONS

  const handlePaginationParams = () => {
    switch (table) {
      case "bookings":
        if (!Object.keys(mobileBookings).length) return;
      case "items":
        if (!Object.keys(atinaItems).length) return;

      default:
        break;
    }

    // dispatch(setTotalPages({ total: mobileBookings?.totalPages }));
  };
  const handleNextPage = () => {
    dispatch(
      setCurrentPage({ number: paginationParams.currentPage + 1, table })
    );
  };
  const handlePreviousPage = () => {
    dispatch(
      setCurrentPage({ number: paginationParams.currentPage - 1, table })
    );
  };
  const handlePageSize = (size) => {
    dispatch(setPageSize({ size, table }));
  };

  const gotoPage = (pgNumber) => {
    dispatch(setCurrentPage({ number: pgNumber, table }));
  };

  return {
    handleSortParams,
    handleNextPage,
    handlePageSize,
    makeUrlParams,
    handlePaginationParams,
    handlePreviousPage,
    gotoPage,
  };
};

export default usePagination;
