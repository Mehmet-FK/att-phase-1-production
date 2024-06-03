import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/system/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import styles from "../table_styles.module.css";
import { tableStyles } from "@/styles/table_styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Collapse, Tooltip } from "@mui/material";

const CustomTableHead = ({
  headerGroups,
  setResetResize,
  resetResize,
  handleRightClick,
  handleSortParams,
  checkboxColumn,
  setCheckboxColumn,
  table,
}) => {
  //! ▼▼▼▼▼ Deactivated but it can be needed in the future ▼▼▼▼▼
  // const [showEmptyCells, setShowEmptyCells] = useState(false);
  // const router = useRouter();
  // const { user } = useSelector((state) => state.settings);
  // useEffect(() => {
  //   if (
  //     (router.pathname === "/users" || router.pathname === "/items") &&
  //     user?.isAdmin
  //   ) {
  //     setShowEmptyCells(true);
  //   }
  // }, [user]);
  //! ▲▲▲▲▲ ======== ▲▲▲▲▲

  const { sortingParams } = useSelector((state) => state.tableUtils[table]);
  return (
    <TableHead
      sx={tableStyles.tableHead}
      onContextMenu={(e) => handleRightClick(e, "head")}
    >
      {!headerGroups?.length && (
        <TableCell
          style={{
            height: "50px",
            border: "2px solid red",
            display: "grid",
            placeItems: "center",
          }}
        >
          {!headerGroups?.length && "Sie haben alle Spalten ausgeblendet!"}
        </TableCell>
      )}

      {headerGroups.map((headerGroup) => (
        <TableRow className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
          {checkboxColumn && (
            <Collapse
              sx={{}}
              orientation="horizontal"
              in={checkboxColumn.isOpen}
            >
              <Tooltip
                sx={{ display: !checkboxColumn.isOpen && "none" }}
                title="Alles abwählen"
                placement="top"
                arrow
              >
                <TableCell
                  sx={{
                    ...tableStyles.th.cell,
                    color: "#1976d2",
                    width: "5rem",
                    fontSize: "0.65rem",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                  onClick={(e) => {
                    setCheckboxColumn({
                      isOpen: false,
                      selectedRows: [],
                      data: [],
                    });
                  }}
                >
                  {checkboxColumn.selectedRows.length} auswahl
                </TableCell>
              </Tooltip>
            </Collapse>
          )}
          {headerGroup.headers.map((column) => (
            <TableCell
              className={styles.th}
              {...column.getHeaderProps()}
              sx={{ ...tableStyles.th.cell, userSelect: "none" }}
              align="left"
              onClick={(e) => handleSortParams(column, e)}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <span>{column.render("Header")} </span>
                {sortingParams[column.id] === "desc" && (
                  <ArrowDownwardIcon fontSize="small" />
                )}
                {sortingParams[column.id] === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}

                {/* {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowDownwardIcon fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon fontSize="small" />
                  )
                ) : (
                  ""
                )} */}
              </div>
              <div
                // style={{ border: "2px solid green" }}
                {...column.getResizerProps()}
                onClick={(e) => {
                  setResetResize(!resetResize);
                  e.stopPropagation();
                }}
                className={`${styles.resizer} ${
                  column.isResizing ? styles.isResizing : null
                }`}
              />
            </TableCell>
          ))}

          {/* ▼▼▼▼▼ Deactivated but it can be needed in the future ▼▼▼▼▼ */}
          {/* {showEmptyCells && (
            <>
              <TableCell
                className={styles.th}
                sx={{ borderRight: "1px solid #eee", minWidth: "70px" }}
              ></TableCell>
              <TableCell
                className={styles.th}
                sx={{ borderRight: "1px solid #eee", minWidth: "70px" }}
              ></TableCell>
            </>
          )} */}
          {/* ▲▲▲▲▲ ======== ▲▲▲▲▲ */}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default CustomTableHead;
