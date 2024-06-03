import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import React, { memo, useCallback, useEffect, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FilterHead from "./filter_components/FilterHead";
import { useSelector } from "react-redux";
import TimeInput from "../TimeInput";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import useFilters from "@/hooks/useFilters";
const bookingsFilterParams = {
  id: null,
  bookingType: null,
  street: null,
  streetnumber: null,
  zip: null,
  city: null,
  country: null,
  nfcTagID: null,
  nfcTagInfo: null,
  userID: null,
  itemID: null,
  username: null,
  dateFrom: null,
  dateTo: null,
  timeFrom: null,
  timeTo: null,
};

const BookingsFilter = ({}) => {
  const { filterBookings, resetFilter } = useFilters();
  const { bookingTypes } = useSelector((state) => state.atina);
  const [open, setOpen] = useState(false);

  const [filterVal, setFilterVal] = useState(bookingsFilterParams);
  const handleFilter = useCallback(
    (e) => {
      e.preventDefault();
      filterBookings(filterVal, setFilterVal);
    },
    [filterVal]
  );

  const handleReset = useCallback(() => {
    setFilterVal(bookingsFilterParams);
    resetFilter("bookings");
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
      <FilterHead
        open={open}
        setOpen={setOpen}
        pageTitle={"Mobile Buchungen"}
      />
      <Collapse
        component={"form"}
        in={open}
        sx={{
          width: "100%",
        }}
        timeout="auto"
        unmountOnExit
      >
        {/* FIRST ROW */}
        <Grid
          container
          sx={{
            ...filterStyles.insideWrapper,
            flexDirection: "row",
            paddingBottom: "5px",
            // columnGap: "5px",
          }}
        >
          <Grid item md={12 / 5}>
            <FormControl
              sx={{ minWidth: 120, width: "calc(100% - 5px)" }}
              size="small"
            >
              <InputLabel id="bookingType">Buchungstyp</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="bookingType"
                id="demo-select-small"
                value={filterVal?.bookingType || ""}
                label="Buchungstyp"
                onChange={(e) =>
                  setFilterVal({ ...filterVal, bookingType: e.target.value })
                }
              >
                <MenuItem value={""}>
                  <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                    None
                  </Typography>
                </MenuItem>
                {Object.entries(bookingTypes)?.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item[0]}>
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {item[1]?.Caption}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12 / 5}>
            <FormControl
              sx={{ minWidth: 120, width: "calc(100% - 5px)" }}
              size="small"
            >
              <InputLabel id="itemType">Itemtyp</InputLabel>
              <Select
                // sx={{ width: "100%" }}
                labelId="itemType"
                id="demo-select-small"
                value={filterVal?.itemType || ""}
                label="Itemtyp"
                onChange={(e) =>
                  setFilterVal({ ...filterVal, itemType: e.target.value })
                }
              >
                <MenuItem value={""}>
                  <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                    None{" "}
                  </Typography>
                </MenuItem>
                <MenuItem value={"Order"}>
                  <Typography sx={{ fontSize: "0.7rem" }}>Auftrag </Typography>
                </MenuItem>
                <MenuItem value={"Meter"}>
                  <Typography sx={{ fontSize: "0.7rem" }}>Zähler </Typography>
                </MenuItem>
                <MenuItem value={"Vehicle"}>
                  <Typography sx={{ fontSize: "0.7rem" }}>KFZ </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12 / 5}>
            <FormControl
              sx={{ minWidth: 120, width: "calc(100% - 5px)" }}
              size="small"
            >
              <InputLabel id="state">Import Status</InputLabel>
              <Select
                sx={{
                  width: "100%",
                  // border: "1px solid red",
                  maxHeight: "2rem",
                }}
                size="small"
                labelId="state"
                id="demo-select-small"
                value={filterVal?.state || ""}
                label="Buchungstyp"
                onChange={(e) =>
                  setFilterVal({ ...filterVal, state: e.target.value })
                }
              >
                <MenuItem value={""}>
                  <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                    None
                  </Typography>
                </MenuItem>

                <MenuItem value="I">
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      width: "100%",
                      // border: "1px solid red",
                    }}
                  >
                    <LoopIcon /> <span>In Bearbeitung</span>
                  </Typography>
                </MenuItem>
                <MenuItem value="A">
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      width: "100%",
                    }}
                  >
                    <SyncProblemIcon />
                    <span>Abgebrochen</span>
                  </Typography>
                </MenuItem>
                <MenuItem value="D">
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      width: "100%",
                    }}
                  >
                    <CheckIcon />
                    <span>Gesendet</span>
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* SECOND ROW */}
        <Grid
          container
          sx={{
            ...filterStyles.insideWrapper,
            flexDirection: "row",
            // columnGap: "5px",
          }}
        >
          <Grid
            item
            md={12 / 5}
            sx={{
              display: "flex",
              columnGap: "5px",
              paddingRight: "5px",
              paddingBottom: "5px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                sx={{ width: "calc(100% - 5px)" }}
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
            <TimeInput
              name="timeFrom"
              label="Uhrzeit (von)"
              filterVal={filterVal}
              setFilterVal={setFilterVal}
              value={filterVal?.timeFrom}
              width={"40%"}
            />
          </Grid>
          <Grid
            item
            md={12 / 5}
            sx={{ display: "flex", columnGap: "5px", paddingRight: "5px" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                sx={{ width: "calc(100% - 5px)" }}
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
            <TimeInput
              name="timeTo"
              label="Uhrzeit (bis)"
              filterVal={filterVal}
              setFilterVal={setFilterVal}
              value={filterVal?.timeTo}
              width={"40%"}
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal.username || ""}
              variant="outlined"
              size="small"
              label="Benutzername"
              name="username"
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.itemNumber || ""}
              variant="outlined"
              size="small"
              label="Datensatznummer"
              name="itemNumber"
            />
          </Grid>
        </Grid>
        {/* THIRD ROW */}
        <Grid
          container
          sx={{
            ...filterStyles.insideWrapper,
            flexDirection: "row",
            paddingBottom: "5px",
            // columnGap: "5px",
          }}
        >
          <Grid item md={(12 / 5) * 2}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.street || ""}
              variant="outlined"
              size="small"
              label="Straße"
              name="street"
            />
          </Grid>
          <Grid
            item
            md={12 / 5}
            sx={{ display: "flex", columnGap: "5px", paddingRight: "5px" }}
          >
            <TextField
              sx={filterStyles.textField}
              onChange={handleChange}
              value={filterVal?.streetnumber || ""}
              variant="outlined"
              size="small"
              label="Hausnummer"
              name="streetnumber"
            />
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.zip || ""}
              variant="outlined"
              size="small"
              label="PLZ"
              name="zip"
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.city || ""}
              variant="outlined"
              size="small"
              label="Stadt"
              name="city"
            />
          </Grid>
          <Grid item md={12 / 5}>
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
        {/* FOURTH ROW */}
        <Grid
          container
          sx={{
            ...filterStyles.insideWrapper,
            flexDirection: "row",
            // columnGap: "5px",
          }}
        >
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.data1 || ""}
              variant="outlined"
              size="small"
              label="Daten 1"
              name="data1"
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.data2 || ""}
              variant="outlined"
              size="small"
              label="Daten 2"
              name="data2"
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.data3 || ""}
              variant="outlined"
              size="small"
              label="Daten 3"
              name="data3"
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% - 5px)" }}
              onChange={handleChange}
              value={filterVal?.data4 || ""}
              variant="outlined"
              size="small"
              label="Daten 4"
              name="data4"
            />
          </Grid>
          <Grid item md={12 / 5}>
            <TextField
              sx={{ ...filterStyles.textField, width: "calc(100% )" }}
              onChange={handleChange}
              value={filterVal?.data5 || ""}
              variant="outlined"
              size="small"
              label="Daten 5"
              name="data5"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            ...filterStyles.insideWrapper,
            display: "flex",
          }}
        >
          {/* FOURTH ROW */}

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

export default BookingsFilter;
