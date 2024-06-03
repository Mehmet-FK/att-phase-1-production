import { createSlice } from "@reduxjs/toolkit";

const tableUtilsSlice = createSlice({
  name: "tableUtils",

  initialState: {
    bookings: {
      searchTrigger: false,
      filterParams: "",
      sortingParams: {},
      sortingParamsString: "",
      paginationParamsString: "",
      paginationParams: {
        pageSize: 25,
        currentPage: 1,
        totalPages: 1,
      },
    },
    items: {
      searchTrigger: false,
      filterParams: "",
      sortingParams: {},
      sortingParamsString: "",
      paginationParamsString: "",
      paginationParams: {
        pageSize: 25,
        currentPage: 1,
        totalPages: 1,
      },
    },
    users: {
      searchTrigger: false,
      filterParams: "",
      sortingParams: {},
      sortingParamsString: "",
      paginationParamsString: "",
      paginationParams: {
        pageSize: 25,
        currentPage: 1,
        totalPages: 1,
      },
    },
    protocol: {
      searchTrigger: false,
      filterParams: "",
      sortingParams: {},
      sortingParamsString: "",
      paginationParamsString: "",
      paginationParams: {
        pageSize: 25,
        currentPage: 1,
        totalPages: 1,
      },
    },
  },
  reducers: {
    setFilterParams: (state, { payload: { params, table } }) => {
      state[table].filterParams = params;
    },
    setSortType: (state, { payload: { field, table } }) => {
      state[table].sortingParams = {
        ...field,
      };
    },
    setSearchTrigger: (state, { payload: { table } }) => {
      state[table].searchTrigger = !state[table].searchTrigger;
    },
    makeSortParamsString: (state, { payload: { str, table } }) => {
      state[table].sortingParamsString = str;
    },
    setPageSize: (state, { payload: { size, table } }) => {
      state[table].paginationParams.pageSize = size;
    },
    setCurrentPage: (state, { payload: { number, table } }) => {
      state[table].paginationParams.currentPage = number;
    },
    setTotalPages: (state, { payload: { total, table } }) => {
      state[table].paginationParams.totalPages = total;
    },
    makePaginationParamsString: (state, { payload: { str, table } }) => {
      state[table].paginationParamsString = str;
    },
  },
});

export const {
  setSearchTrigger,
  setFilterParams,
  setSortType,
  makeSortParamsString,
  setCurrentPage,
  setTotalPages,
  setPageSize,
  makePaginationParamsString,
} = tableUtilsSlice.actions;
export default tableUtilsSlice.reducer;
