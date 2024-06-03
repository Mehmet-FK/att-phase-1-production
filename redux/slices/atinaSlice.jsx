"use client";
import { createSlice } from "@reduxjs/toolkit";
const settlement = [
  "Amstetten",
  "Graz",
  "Innsbruck",
  "Kalsdorf",
  "Klagenfurt",
  "Klosterneuburg",
  "Krems",
  "Leoben",
  "Linz",
  "Mödling",
  "Neusiedl",
  "Oberndorf/Kitzbühel",
  "Pinzgau",
  "Rankweil",
  "Regau",
  "Salzburg",
  "St. Pölten",
  "Völkermarkt",
  "Wien",
  "Wolfurt",
  "Wr. Neustadt",
];
const client = ["Attensam", "Attensam Sued", "Attensam West", "Attensam Nord"];
const atinaSlice = createSlice({
  name: "atina",

  initialState: {
    atinaUsers: {},
    mobileBookings: {},
    bookingTypes: [],
    nfcTags: [],
    atinaItems: {},
    userRoles: [],
    protocol: {},
    loading: true,
    error: false,
    errorMsg: "",
    settlement: settlement,
    client: client,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      // state.loading = false;
      state.error = false;
      state.errorMsg = "";
      if (url.toLowerCase().includes("mobile")) {
        state.mobileBookings = data;
      } else if (url.toLowerCase().includes("nfc")) {
        state.nfcTags = data;
      } else if (url.toLowerCase().includes("users")) {
        state.atinaUsers = data;
      } else if (url.toLowerCase().includes("items")) {
        state.atinaItems = data;
      } else if (url.toLowerCase().includes("bookingtypes")) {
        state.bookingTypes = data;
      } else if (url.toLowerCase().includes("roledefinitions")) {
        state.userRoles = data;
      } else if (url.toLowerCase().includes("protocol")) {
        state.protocol = data;
      }
    },
    editOneObject: (state, { payload: { data, modul } }) => {
      if (modul.includes("user")) {
        const originalArray = state.atinaUsers.entries;
        const id = data.userInfo.id;
        const tempArray = originalArray.map((u) =>
          u.userInfo.id !== id ? u : data
        );
        state.atinaUsers.entries = tempArray;
      }
    },
    fetchFail: (state, { payload: { message } }) => {
      // state.loading = false;
      state.error = true;
      state.errorMsg = message;
    },

    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail, stopLoading, editOneObject } =
  atinaSlice.actions;
export default atinaSlice.reducer;
