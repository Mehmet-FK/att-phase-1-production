"use client";

import React, { useEffect, useRef, useState } from "react";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import {
  bookingsTableCSV,
  itemsTableCSV,
  nfcTableCSV,
  protocolTableCSV,
  sqlTableCSV,
  userTableCSV,
} from "@/helpers/DownloadCsvFunctions";
import axios from "axios";
import useAxios from "@/hooks/useAxios";
import { useSelector } from "react-redux";
import usePagination from "@/hooks/usePagination";

const DownloadCSV = ({ rawData, fileName, type, table }) => {
  const date = new Date().toJSON().slice(0, 10).replaceAll("-", "");
  const [url, setUrl] = useState("");
  const { axiosWithToken } = useAxios();
  const { filterParams, paginationParams } = useSelector(
    (state) => state?.tableUtils[table]
  );
  const downloadRef = useRef(null);
  const convertJsonToCsv = (fltrData) => {
    let headers;
    let main;
    let res;
    // console.log(fltrData);
    switch (fileName) {
      case "benutzer":
        res = userTableCSV(fltrData);
        headers = res.h;
        main = res.m;

        break;
      case "mobile_buchungen":
        res = bookingsTableCSV(fltrData);
        headers = res.h;
        main = res.m;
        break;
      case "nfc_tags":
        res = nfcTableCSV(fltrData);
        headers = res.h;
        main = res.m;
        break;
      case "items":
        res = itemsTableCSV(fltrData, type);

        headers = res.h;
        main = res.m;
        break;
      case "protokolle":
        res = protocolTableCSV(fltrData, type);

        headers = res.h;
        main = res.m;
        break;
      case "SQL_Abfrage":
        res = sqlTableCSV(rawData);

        headers = res.h;
        main = res.m;
        break;

      default:
        return;
    }
    const csv = [headers, ...main].join("\n");
    const blob = new Blob([csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    setUrl(url);

    // downloadRef.current?.click();
  };
  const getFilteredData = async () => {
    let url = "";
    console.log(filterParams);
    if (table === "users") {
      url = `AtinaUsers?showPagination=true&pageNumber=1&pageSize=${
        paginationParams?.pageSize > 25 ? paginationParams?.pageSize : 1000
      }`;
    } else if (table === "bookings") {
      url = `api/AtinaMobileBookings?showPagination=true&pageNumber=1&pageSize=${
        paginationParams?.pageSize > 25 ? paginationParams?.pageSize : 1000
      }`;
    } else if (table === "items") {
      url = `api/AtinaItems/SearchByKeyValue?onlyWithTagId=false&showPagination=true&pageNumber=1&pageSize=${
        paginationParams?.pageSize > 25 ? paginationParams?.pageSize : 1000
      }
         `;
    } else if (table === "protocol") {
      url = `api/AtinaProtocol?showPagination=true&pageNumber=1&pageSize=${
        paginationParams?.pageSize > 25 ? paginationParams?.pageSize : 1000
      }`;
    }

    try {
      axiosWithToken(url + filterParams).then((res) => {
        console.log(res);
        convertJsonToCsv(res?.data?.entries);
      });
      // convertJsonToCsv(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (url) {
      downloadRef.current?.click();
    }
    setUrl("");
  }, [url]);

  return (
    <>
      {rawData && (
        <Tooltip
          title="CSV Datei Herunterladen"
          arrow
          sx={{ display: "flex", alignItems: "center" }}
          // onClick={() => rawData && convertJsonToCsv()}
        >
          <IconButton onClick={(e) => getFilteredData()}>
            <DownloadForOfflineIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      <a
        ref={downloadRef}
        href={url}
        download={`${date + "_" + fileName}.csv`}
        style={{
          color: "#888",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",

          position: "absolute",
          left: 20,
        }}
      ></a>
    </>
  );
};

export default DownloadCSV;
