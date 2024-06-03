import { Box, Button, Collapse, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableStyles } from "@/styles/table_styles";
import Loading from "@/components/Loading";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import FilterHead from "@/components/filters/filter_components/FilterHead";
import { filterStyles } from "@/styles/filter_styles";
import SqlEditorTableSkeleton from "@/components/skeleton/SqlEditorTableSkeleton";
import SQLQueryFilter from "@/components/filters/SQLQueryFilter";
import SQLQueryTable from "@/components/tables/SQLQueryTable";

const Admin = () => {
  // const [sqlQuery, setSqlQuery] = useState(
  //   "SELECT TOP 150 * FROM ATINA_MobileBookings"
  // );
  // const [data, setData] = useState([]);

  // const [headers, setHeaders] = useState([]);
  // const [status, setStatus] = useState({
  //   isLoading: false,
  //   err: { isError: false, message: "" },
  // });
  // const handleSubmit = async (sqlQuery) => {
  //   setStatus((prev) => ({ ...prev, isLoading: true }));
  //   try {
  //     const res = await axios.post(
  //       `https://localhost:7294/api/Query`,
  //       {
  //         query: sqlQuery,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setData(res.data);
  //     setStatus((prev) => ({ ...prev, isLoading: false }));

  //     console.log(res.data);
  //   } catch (error) {
  //     setStatus({
  //       isLoading: false,
  //       err: { isError: true, message: err?.message },
  //     });
  //     console.log(error);
  //   }
  // };
  // console.log(status.isLoading);

  // useEffect(() => {
  //   if (data.length) {
  //     const x = Object.keys(data[0]);
  //     setHeaders(x);
  //   }
  // }, [data]);

  return (
    <>
      {/* <TableContainer
        component={Paper}
        sx={{
          ...tableStyles.tableContainer,
          minHeight: status.isLoading && "90vh",
        }}
      >
        <SQLQueryFilter
          setSqlQuery={setSqlQuery}
          sqlQuery={sqlQuery}
          handleSubmit={handleSubmit}
        />
        <Table sx={{ minWidth: 650, position: "relative" }}>
          <TableHead sx={{ ...tableStyles.tableHead, top: -8 }}>
            <TableRow>
              {headers?.map((header, i) => (
                <TableCell
                  key={i}
                  sx={{
                    ...tableStyles.th.cell,
                    minWidth: 80,
                    p: 1,
                  }}
                  align="center"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <SqlEditorTableSkeleton loading={status.isLoading} />
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
        </Table>
      </TableContainer> */}
      <SQLQueryTable />
    </>
  );
};

export default Admin;
