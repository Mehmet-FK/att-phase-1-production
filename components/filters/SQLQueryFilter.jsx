import React, { useEffect, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import { Box, Collapse, Paper, Typography } from "@mui/material";
import FilterHead from "./filter_components/FilterHead";
import SQLHighlightInput from "./filter_components/SQLHighlightInput";
import { useMemo } from "react";

const SQLQueryFilter = ({ handleSubmit, status }) => {
  const [openEditor, setOpenEditor] = useState(true);
  const [queryError, setQueryError] = useState("");
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT TOP 150 * FROM ATINA_MobileBookings"
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const prohibitedCmds = useMemo(
    () => /\b(DROP|DELETE|UPDATE|INSERT|CREATE|ALTER|MODIFY|TRUNCATE)\b/gi,
    []
  );
  const handleChange = (e) => {
    const inputArr = sqlQuery.split(/[ \n]+/);
    if (sqlQuery.match(prohibitedCmds)) {
      const command = inputArr.find((substr) => prohibitedCmds.test(substr));
      setQueryError(`${command?.toUpperCase()} Befehl ist nicht erlaubt!`);
    } else {
      setQueryError("");
    }

    setSqlQuery(e);
  };
  useEffect(() => {
    if (!isAnimating) return;
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  return (
    <Box
      component={Paper}
      sx={{ ...filterStyles.container, position: "relative" }}
    >
      <FilterHead
        open={openEditor}
        setOpen={setOpenEditor}
        pageTitle="SQL Editor"
      />
      <Collapse
        component="form"
        onSubmit={(e) =>
          handleSubmit(e, sqlQuery, prohibitedCmds, setIsAnimating)
        }
        onKeyDown={(e) =>
          e.key === "Enter" &&
          e.ctrlKey &&
          handleSubmit(e, sqlQuery, prohibitedCmds)
        }
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
          rowGap: "8px",
          paddingInline: "1rem",
          position: "relative",
        }}
        in={openEditor}
        timeout={350}
        unmountOnExit
      >
        <div
          className={isAnimating ? "inputErrorAnimation" : ""}
          // className={queryError && "inputErrorAnimation"}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "8px",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            minHeight: "10rem",
          }}
        >
          <SQLHighlightInput
            handleChange={handleChange}
            sqlQuery={sqlQuery}
            setSqlQuery={setSqlQuery}
            queryError={queryError}
          />
        </div>
        {openEditor && (
          <div
            style={{
              display: "flex",
              columnGap: "5px",
              position: "absolute",
              bottom: 10,
              left: 0,
              paddingInline: "1rem",
              userSelect: "none",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "red",
                fontWeight: "600",

                display: !queryError && "none",
              }}
            >
              &lt; {queryError} /&gt;
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "red",
                fontWeight: "600",
                display: !status?.err?.isError && "none",
              }}
            >
              &lt; {status?.err?.message} /&gt;
            </Typography>
          </div>
        )}
      </Collapse>
    </Box>
  );
};

export default SQLQueryFilter;
