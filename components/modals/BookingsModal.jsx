import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, Typography, IconButton } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { modalStyles } from "@/styles/modal_styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloseIcon from "@mui/icons-material/Close";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const initialBookingParams = {
  Itemnumber: null,
  BookingType: null,
  Date: null,
  Time: null,
  Street: null,
  Streetnumber: null,
  ZIP: null,
  City: null,
  Country: null,
};

const BookingsModal = ({ setOpenBookingModal, openBookingModal, booking }) => {
  const { user } = useSelector((state) => state.settings);
  const { bookingTypes } = useSelector((state) => state.atina);
  const handleClose = () => {
    setOpenBookingModal(false);
  };
  const [inputVal, setInputVal] = useState({});
  const handleChange = (e) => {
    if (!user?.isAdmin) return;

    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const adapterDayjs = new AdapterDayjs();
    const isValid = adapterDayjs.isValid(inputVal?.Date);
    const currentValues = {
      ...inputVal,
      Date: isValid ? inputVal.Date : null,
    };
    setInputVal({
      ...inputVal,
      Date: isValid ? inputVal.Date : null,
    });
  };

  useEffect(() => {
    if (booking) {
      setInputVal({
        ...booking,
        Date: dayjs(booking.Date),
        Time: booking?.Time?.slice(0, booking?.Time.indexOf(".")),
      });
    } else {
      setInputVal(initialBookingParams);
    }
  }, [booking]);
  return (
    <>
      <Modal
        open={openBookingModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ ...modalStyles.bookingModal.cardStyle, height: 440 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                columnGap: "10px",
                alignItems: "center",
              }}
            >
              <LibraryBooksIcon fontSize="large" />
              <Typography variant="h5">Mobile Buchungen</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <CardContent sx={modalStyles.bookingModal.content}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              }}
            >
              <div
                style={{
                  ...modalStyles.bookingModal.inputGroup,
                  flexDirection: "row",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    disabled={!user?.isAdmin}
                    label="Datum"
                    size="small"
                    format="DD.MM.YYYY"
                    name="Date"
                    sx={{ width: "100%" }}
                    onChange={(newVal) => {
                      setInputVal({
                        ...inputVal,
                        Date: new Date(newVal?.$d),
                      });
                    }}
                    value={inputVal?.Date}
                  />
                </LocalizationProvider>
                <TextField
                  disabled={!user?.isAdmin}
                  variant="outlined"
                  label="Uhrzeit"
                  size="small"
                  name="Time"
                  sx={{ width: "100%" }}
                  value={inputVal?.Time || ""}
                  onChange={(e) =>
                    setInputVal({
                      ...inputVal,
                      Time: e.target.value,
                    })
                  }
                />{" "}
              </div>
              <FormControl sx={{ minWidth: 120, width: "100%" }} size="small">
                <InputLabel id="bookingType">Buchungstyp</InputLabel>
                <Select
                  disabled={!user?.isAdmin}
                  readOnly={!user?.isAdmin}
                  labelId="bookingType"
                  id="demo-select-small"
                  value={inputVal?.BookingType || ""}
                  label="Buchungstyp"
                  onChange={(e) =>
                    setInputVal({ ...inputVal, BookingType: e.target.value })
                  }
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {bookingTypes &&
                    Object.entries(bookingTypes)?.map((item, i) => {
                      return (
                        <MenuItem key={i} value={item[0]}>
                          {item[1]?.Caption}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <TextField
                disabled={!user?.isAdmin}
                variant="outlined"
                label="Datensatznummer"
                size="small"
                sx={{ width: "100%" }}
                name="Itemnumber"
                onChange={handleChange}
                value={inputVal.Itemnumber || ""}
              />
              <TextField
                disabled={!user?.isAdmin}
                variant="outlined"
                label="Straße"
                size="small"
                sx={{ width: "100%" }}
                name="Street"
                onChange={handleChange}
                value={inputVal.Street || ""}
              />

              <TextField
                disabled={!user?.isAdmin}
                variant="outlined"
                label="Hausnummer"
                size="small"
                sx={{ width: "100%" }}
                name="Streetnumber"
                onChange={handleChange}
                value={inputVal.Streetnumber || ""}
              />

              <div style={{ display: "flex" }}>
                <TextField
                  disabled={!user?.isAdmin}
                  variant="outlined"
                  label="PLZ"
                  size="small"
                  sx={{ width: "100%" }}
                  name="ZIP"
                  onChange={handleChange}
                  value={inputVal.ZIP || ""}
                />

                <TextField
                  disabled={!user?.isAdmin}
                  variant="outlined"
                  label="Stadt"
                  size="small"
                  sx={{ width: "100%" }}
                  name="City"
                  onChange={handleChange}
                  value={inputVal.City || ""}
                />
              </div>

              <TextField
                disabled={!user?.isAdmin}
                variant="outlined"
                label="Land"
                size="small"
                name="Country"
                sx={{ width: "100%" }}
                onChange={handleChange}
                value={inputVal.Country || ""}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {user.isAdmin && (
                <Button
                  onClick={handleSubmit}
                  sx={modalStyles.bookingModal.button}
                  variant="contained"
                  color="secondary"
                >
                  Speichern
                </Button>
              )}
              <Button
                sx={modalStyles.bookingModal.button}
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                {user.isAdmin ? "Abbrechen" : "Schließen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default memo(BookingsModal);
