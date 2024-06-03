"use client";
import { configureStore } from "@reduxjs/toolkit";
import atinaReducer from "../slices/atinaSlice";
import settingsReducer from "../slices/settingsSlice";
import tablesReducer from "../slices/tableUtilsSlice";

const store = configureStore({
  reducer: {
    atina: atinaReducer,
    settings: settingsReducer,
    tableUtils: tablesReducer,
  },
});

export default store;
