"use client";

import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    user: {
      isAdmin: false,
      token: null,
      roles: [],
      avatarUrl: "",
      firstname: "",
      lastname: "",
    },
    darkMode: "light",
    tables: {
      users: {
        hiddenColumns: [],
        columnWidths: {},
      },
      mobileBookings: {
        hiddenColumns: [],
        columnWidths: {},
      },
      nfcTags: {
        hiddenColumns: [],
        columnWidths: {},
      },
      items: {
        hiddenColumns: [],
        columnWidths: {},
      },
    },
  },
  reducers: {
    setTheme: (state, { payload: { mode } }) => {
      state.darkMode = mode;
    },
    setHiddenColumns: (state, { payload: { table, columns } }) => {
      state.tables[table] = { ...state.tables[table], hiddenColumns: columns };
    },
    setUser: (state, { payload: { user } }) => {
      state.user.isAdmin = user.userInfo.isAdministrator;
      state.user.avatarUrl = user.avatarUrl;
      state.user.firstname = user.userInfo.firstname;
      state.user.lastname = user.userInfo.lastname;
      state.user.token = user.token;
      state.user.roles = user.roles;
    },
  },
});

export const { setTheme, setHiddenColumns, setUser } = settingsSlice.actions;
export default settingsSlice.reducer;
