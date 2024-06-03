import SqlEditorTableSkeleton from "@/components/skeleton/SqlEditorTableSkeleton";
import { useEffect, useMemo, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableStyles } from "@/styles/table_styles";
import SQLQueryFilter from "../filters/SQLQueryFilter";
import { IconButton, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import DownloadCSV from "../DownloadCSV";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { sqlTableCSV } from "@/helpers/DownloadCsvFunctions";
const SQLQueryTable = () => {
  const date = new Date().toJSON().slice(0, 10).replaceAll("-", "");
  const downloadRef = useRef(null);

  const initialStatus = useMemo(
    () => ({
      isLoading: false,
      err: { isError: false, message: "" },
    }),
    []
  );

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [status, setStatus] = useState(initialStatus);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e, sqlQuery, prohibitedCmds, setIsAnimating) => {
    e.preventDefault();

    if (sqlQuery.match(prohibitedCmds)) {
      setIsAnimating(true);
      return;
    }

    setStatus({ ...initialStatus, isLoading: true });
    try {
      const res = await axios.post(
        `https://localhost:7294/api/Query`,
        {
          query: sqlQuery,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setData(res.data);
      setStatus((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setStatus({
        ...initialStatus,
        err: {
          isError: true,
          message: error?.response?.data,
        },
      });
      console.log(error);
    }
  };

  const exportCsv = () => {
    const res = sqlTableCSV(data);
    const csv = [res.h, ...res.m].join("\n");
    const blob = new Blob([csv], { type: "application/csv" });
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };

  useEffect(() => {
    if (data.length) {
      const x = Object.keys(data[0]);
      setHeaders(x);
    }
  }, [data]);

  useEffect(() => {
    if (url) {
      downloadRef.current?.click();
    }
    setUrl("");
  }, [url]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        ...tableStyles.tableContainer,
        minHeight: status.isLoading && "90vh",
      }}
    >
      <SQLQueryFilter handleSubmit={handleSubmit} status={status} />
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        {" "}
        <Tooltip
          title="CSV Datei Herunterladen"
          arrow
          sx={{ display: "flex", alignItems: "center" }}
          // onClick={() => rawData && convertJsonToCsv()}
        >
          <IconButton onClick={(e) => exportCsv()}>
            <DownloadForOfflineIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        {/* <DownloadCSV rawData={data} fileName={"SQL_Abfrage"} /> */}
        <a
          ref={downloadRef}
          href={url}
          download={`${"SqlQuery" + "_" + date}.csv`}
          style={{
            color: "#888",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",

            position: "absolute",
            left: 20,
          }}
        ></a>
      </div>
      <Table sx={{ minWidth: 650, position: "relative" }}>
        <TableHead
          sx={{
            ...tableStyles.tableHead,
            top: -8,
            // display: status.isLoading && "none",
            // transition: "0.55s",
          }}
        >
          <TableRow>
            {headers?.map((header, i) => (
              <TableCell
                key={i}
                sx={{
                  ...tableStyles.th.cell,
                  minWidth: 80,
                  p: 1,
                  borderRight: status.isLoading ? "none" : "1px solid #ddd",
                }}
                align="center"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <SqlEditorTableSkeleton loading={status.isLoading} />
        {!status.isLoading && (
          <TableBody
            sx={{
              minHeight: status.isLoading && "80vh",
              opacity: status.isLoading ? 0 : 1,
              transition: "0.55s",
            }}
          >
            {data?.map((row) => (
              <TableRow key={row.ID}>
                {headers?.map((cell, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      ...tableStyles.tr.cell,
                      p: 0.3,
                      fontSize: "0.6rem",
                      borderRight: status.isLoading ? "none" : "1px solid #ddd",
                    }}
                    align="left"
                    size="small"
                    scope="row"
                  >
                    {JSON.stringify(row[cell])?.replaceAll('"', "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default SQLQueryTable;
