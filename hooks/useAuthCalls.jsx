"use client";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchStart } from "../redux/slices/atinaSlice";

const session_ttl = 432000000;
const SESSION_KEY = "att-auth-session-start";

const useAuthCalls = () => {
  const dispatch = useDispatch();

  const login = async (info) => {
    const url = `https://pro.attensam.at/atina/AtinaUsers/login?username=${info.username}&password=${info.password}`;

    let res = null;

    dispatch(fetchStart());

    try {
      //TODO: change the admin state with setAdmin function of Settingsslice
      const { data } = await axios.post(url);
      res = data;
    } catch (error) {
      console.log(error);
    }
    return res;
  };

  const checkSession = () => {
    const now = Date.now();
    const lastLogin = localStorage.get(SESSION_KEY);
    if (lastLogin) {
      if (now - lastLogin < session_ttl) {
        localStorage.setItem(SESSION_KEY);
      }
    }
  };

  return { login };
};

export default useAuthCalls;
