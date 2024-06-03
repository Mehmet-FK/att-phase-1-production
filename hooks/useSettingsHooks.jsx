import { setHiddenColumns } from "@/redux/slices/settingsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const useSettings = (table) => {
  const dispatch = useDispatch();

  const hiddenColumnsSetting = (columns) => {
    dispatch(setHiddenColumns({ table, columns }));
  };

  return { hiddenColumnsSetting };
};

export default useSettings;
