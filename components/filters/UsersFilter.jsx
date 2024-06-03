import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/system/Box";
import React, { memo, useState } from "react";
import { filterStyles } from "@/styles/filter_styles";
import FilterHead from "./filter_components/FilterHead";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import useFilters from "@/hooks/useFilters";

const UsersFilter = () => {
  const [open, setOpen] = useState(false);
  const [filterVal, setFilterVal] = useState({});
  const { client, settlement } = useSelector((state) => state.atina);
  const { filterUsers, resetFilter } = useFilters();

  const handleFilter = (e) => {
    e.preventDefault();
    filterUsers(filterVal);
  };
  const handleReset = () => {
    setFilterVal({});
    resetFilter("users");
  };

  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component={Paper} style={filterStyles.container}>
      <FilterHead open={open} setOpen={setOpen} pageTitle={"Benutzer"} />
      <Collapse sx={{ width: "100%" }} in={open} timeout="auto" unmountOnExit>
        <Box component="form" style={filterStyles.insideWrapper}>
          <Grid container sx={filterStyles.grid.container}>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="mandant">Mandant</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="mandant"
                  id="demo-select-small"
                  value={filterVal?.client || ""}
                  label="Mandant"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, client: e.target.value })
                  }
                  MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                >
                  <MenuItem value={""}>
                    <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                      None
                    </Typography>
                  </MenuItem>
                  {client?.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {item}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.client || ""}
                variant="outlined"
                size="small"
                label="Mandant"
                name="client"
              /> */}
            </Grid>
            <Grid item md={2}>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="Standort">Standort</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="Standort"
                  id="demo-select-small"
                  value={filterVal?.settlement || ""}
                  label="Standort"
                  onChange={(e) =>
                    setFilterVal({ ...filterVal, settlement: e.target.value })
                  }
                  MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                >
                  <MenuItem value={""}>
                    <Typography component="em" sx={{ fontSize: "0.7rem" }}>
                      None
                    </Typography>
                  </MenuItem>
                  {settlement?.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {item}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} />
            <Grid item md={2} />
            <Grid item md={2} />
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.firstname || ""}
                variant="outlined"
                size="small"
                label="Vorname"
                name="firstname"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.lastname || ""}
                variant="outlined"
                size="small"
                label="Nachname"
                name="lastname"
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.username || ""}
                variant="outlined"
                size="small"
                label="Benutzername"
                name="username"
              />
            </Grid>

            <Grid item md={2}>
              <TextField
                sx={filterStyles.textField}
                onChange={handleChange}
                value={filterVal.personnelnumber || ""}
                variant="outlined"
                size="small"
                label="Personalnummer"
                name="personnelnumber"
              />
            </Grid>
          </Grid>
          <div style={filterStyles.buttonWrapper}>
            <Button
              sx={filterStyles.button}
              type="submit"
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

export default memo(UsersFilter);
