import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import React, { memo, useCallback, useEffect, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";

import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FilterHead from "./filter_components/FilterHead";
import { useSelector } from "react-redux";
import TimeInput from "../TimeInput";
import useFilters from "@/hooks/useFilters";

const protocolFilterParams = {
  protocolType: null,
  module: null,
  userId: null,
  userName: null,
  itemId: null,
  itemNumber: null,
  dateFrom: null,
  timeFrom: null,
  dateTo: null,
  timeTo: null,
  description: null,
  street: null,
  streetnumber: null,
  zip: null,
  city: null,
  country: null,
};

const ProtocolFilter = ({}) => {
  const [open, setOpen] = useState(false);
  const [filterVal, setFilterVal] = useState(protocolFilterParams);
  const { filterProtocol, resetFilter } = useFilters();

  const handleFilter = useCallback(
    (e) => {
      e.preventDefault();
      filterProtocol(filterVal);
    },
    [filterVal]
  );

  const handleReset = useCallback(() => {
    setFilterVal(protocolFilterParams);
    resetFilter("protocol");
  }, []);

  const handleChange = useCallback(
    (e) => {
      setFilterVal({
        ...filterVal,
        [e.target.name]: e.target.value,
      });
    },
    [filterVal]
  );
  return (
    <Box component={Paper} sx={filterStyles.container}>
      <FilterHead open={open} setOpen={setOpen} pageTitle={"Protokoll"} />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          component="form"
          sx={{
            ...filterStyles.insideWrapper,
            display: "flex",
          }}
        >
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.userId || ""}
                variant="outlined"
                size="small"
                label="Benutzer ID"
                name="userId"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.userName || ""}
                variant="outlined"
                size="small"
                label="Benutzername"
                name="userName"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.itemId || ""}
                variant="outlined"
                size="small"
                label="Datensatz ID"
                name="itemId"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.itemNumber || ""}
                variant="outlined"
                size="small"
                label="Datensatznummer"
                name="itemNumber"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.protocolType || ""}
                variant="outlined"
                size="small"
                label="Protokolltyp"
                name="protocolType"
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.module || ""}
                variant="outlined"
                size="small"
                label="Modul"
                name="module"
              />
            </Grid>

            <Grid item md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  sx={{ width: "100%" }}
                  label="Datum (von)"
                  size="small"
                  format="DD.MM.YYYY"
                  name="dateFrom"
                  onChange={(newVal) => {
                    setFilterVal({
                      ...filterVal,
                      dateFrom: new Date(newVal?.$d),
                    });
                  }}
                  value={filterVal.dateFrom}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  sx={{ width: "100%" }}
                  label="Datum (bis)"
                  size="small"
                  format="DD.MM.YYYY"
                  name="dateTo"
                  onChange={(newVal) =>
                    setFilterVal({
                      ...filterVal,
                      dateTo: new Date(newVal?.$d),
                    })
                  }
                  value={filterVal.dateTo}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={2}>
              <TimeInput
                name="timeFrom"
                label="Uhrzeit (von)"
                filterVal={filterVal}
                setFilterVal={setFilterVal}
                value={filterVal?.timeFrom}
              />
            </Grid>

            <Grid item md={2}>
              <TimeInput
                name="timeTo"
                label="Uhrzeit (bis)"
                filterVal={filterVal}
                setFilterVal={setFilterVal}
                value={filterVal?.timeTo}
              />
            </Grid>
            {/* <Grid item md={2} /> */}
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.street || ""}
                variant="outlined"
                size="small"
                label="Straße"
                name="street"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.streetnumber || ""}
                variant="outlined"
                size="small"
                label="Hausnummer"
                name="streetnumber"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.zip || ""}
                variant="outlined"
                size="small"
                label="PLZ"
                name="zip"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.city || ""}
                variant="outlined"
                size="small"
                label="Stadt"
                name="city"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal?.country || ""}
                variant="outlined"
                size="small"
                label="Land"
                name="country"
              />
            </Grid>
          </Grid>

          <div style={filterStyles.buttonWrapper}>
            <Button
              type="submit"
              color="secondary"
              sx={filterStyles.button}
              variant="contained"
              onClick={(e) => handleFilter(e)}
            >
              {" "}
              Suchen{" "}
            </Button>
            <Button
              color="secondary"
              sx={filterStyles.button}
              variant="contained"
              onClick={() => handleReset()}
            >
              {" "}
              Löschen{" "}
            </Button>
          </div>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ProtocolFilter;
