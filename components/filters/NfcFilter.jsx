import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterHead from "./filter_components/FilterHead";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TimeInput from "../TimeInput";

const NfcFilter = ({ filterVal, setFilterVal, handleFilter, handleReset }) => {
  const [open, setOpen] = useState(false);

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
    <Box component={Paper} style={filterStyles.container}>
      <FilterHead open={open} setOpen={setOpen} pageTitle={"NFC Tags"} />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          component="form"
          // onSubmit={handleFilter}
          style={filterStyles.insideWrapper}
        >
          {/* //? == ROW 1 == */}
          <Grid container sx={filterStyles.grid.container}>
            {/* <Grid item md={2}>
              <TextField
                className={"date-input"}
                variant="outlined"
                type="datetime-local"
                size="small"
                label="Erstellt (von)"
                name="createdFrom"
                sx={filterStyles.textField}
                onChange={(e) => console.log(e.target.value)}
                inputProps={{
                  sx: {
                    cursor: "pointer",
                    "&::-webkit-datetime-edit-year-field": {
                      color: filterVal.createdFrom ? "dateInput" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: filterVal.createdFrom ? "dateInput" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: filterVal.createdFrom ? "dateInput" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: filterVal.createdFrom ? "dateInput" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: filterVal.createdFrom ? "dateInput" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: filterVal.createdFrom ? "dateInput" : "#ddd5",
                    },
                    "&:focus": {
                      "&::-webkit-datetime-edit-year-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-month-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-day-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-minute-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-hour-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-text": {
                        color: "dateInputColor.main",
                      },
                    },
                  },
                }}
              />
            </Grid> */}
            <Grid item md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  sx={{ width: "100%" }}
                  label="Erstellt (von)"
                  size="small"
                  format="DD.MM.YYYY"
                  name="createdFrom"
                  onChange={(newVal) =>
                    setFilterVal({
                      ...filterVal,
                      createdFrom: new Date(newVal?.$d),
                    })
                  }
                  value={filterVal.createdFrom}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  sx={{ width: "100%" }}
                  label="Erstellt (bis)"
                  size="small"
                  format="DD.MM.YYYY"
                  name="createdTo"
                  onChange={(newVal) =>
                    setFilterVal({
                      ...filterVal,
                      createdTo: new Date(newVal?.$d),
                    })
                  }
                  value={filterVal.createdTo}
                />
              </LocalizationProvider>
            </Grid>
            {/* <Grid item md={2}>
              <TextField
                onChange={handleChange}
                value={filterVal.createdTo || ""}
                className={"date-input"}
                variant="outlined"
                type="datetime-local"
                size="small"
                label="Erstellt (bis)"
                name="createdTo"
                sx={filterStyles.textField}
                inputProps={{
                  sx: {
                    cursor: "pointer",
                    "&::-webkit-datetime-edit-year-field": {
                      color: filterVal.createdTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-month-field": {
                      color: filterVal.createdTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-day-field": {
                      color: filterVal.createdTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-minute-field": {
                      color: filterVal.createdTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-hour-field": {
                      color: filterVal.createdTo ? "inherit" : "#ddd5",
                    },
                    "&::-webkit-datetime-edit-text": {
                      color: filterVal.createdTo ? "inherit" : "#ddd5",
                    },
                    "&:focus": {
                      "&::-webkit-datetime-edit-year-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-month-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-day-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-minute-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-hour-field": {
                        color: "dateInputColor.main",
                      },
                      "&::-webkit-datetime-edit-text": {
                        color: "dateInputColor.main",
                      },
                    },
                  },
                }}
              />
            </Grid> */}
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
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="itemType">Typ</InputLabel>
                <Select
                  // sx={{ width: "100%" }}
                  labelId="itemType"
                  id="demo-select-small"
                  value={filterVal?.ItemType || ""}
                  label="Typ"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, ItemType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Order"}>Auftrag</MenuItem>
                  <MenuItem value={"Meter"}>Zähler</MenuItem>
                  <MenuItem value={"Vehicle"}>KFZ</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.street || ""}
                  variant="outlined"
                  size="small"
                  label="Straße"
                  name="street"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.streetnumber || ""}
                  variant="outlined"
                  size="small"
                  label=" Hausnummer"
                  name="streetnumber"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.zip || ""}
                  variant="outlined"
                  size="small"
                  label=" PLZ"
                  name="zip"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.city || ""}
                  variant="outlined"
                  size="small"
                  label="Stadt"
                  name="city"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.country || ""}
                  variant="outlined"
                  size="small"
                  label="Land"
                  name="country"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.itemNumber || ""}
                  variant="outlined"
                  size="small"
                  label="Datensatznummer"
                  name="itemNumber"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data1 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 1"
                  name="data1"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data2 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 2"
                  name="data2"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data3 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 3"
                  name="data3"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data4 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 4"
                  name="data4"
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  onChange={handleChange}
                  sx={filterStyles.textField}
                  value={filterVal.data5 || ""}
                  variant="outlined"
                  size="small"
                  label=" Daten 5"
                  name="data5"
                />
              </Grid>
            </>
          </Grid>
          <div style={filterStyles.buttonWrapper}>
            <Button
              type="submit"
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
              onClick={(e) => handleFilter(e)}
            >
              {" "}
              Suchen{" "}
            </Button>
            <Button
              sx={filterStyles.button}
              variant="contained"
              color="secondary"
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

export default NfcFilter;
