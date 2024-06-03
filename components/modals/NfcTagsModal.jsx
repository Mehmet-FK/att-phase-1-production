"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { modalStyles } from "@/styles/modal_styles";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import NfcIcon from "@mui/icons-material/Nfc";
import { useSelector } from "react-redux";

const NfcTagsModal = ({ openNfcModal, setOpenNfcModal, nfcData }) => {
  const { user } = useSelector((state) => state.settings);
  const handleClose = () => setOpenNfcModal(false);
  const [inputVal, setInputVal] = useState(nfcData);

  useEffect(() => {
    setInputVal(nfcData);
  }, [nfcData]);

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        open={openNfcModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{ ...modalStyles.bookingModal.cardStyle, height: 510, pb: 0 }}
        >
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
              <NfcIcon fontSize="large" />
              <Typography variant="h5">NFC TAGS</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <CardContent sx={modalStyles.bookingModal.content}>
            <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                label="Typ"
                size="small"
                name="itemType"
                sx={{ width: "100%" }}
                value={
                  inputVal.itemType === "Order"
                    ? "Auftrag"
                    : inputVal?.itemType === "Meter"
                    ? "Zähler"
                    : "KFZ" || ""
                }
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />{" "}
              <TextField
                variant="outlined"
                label="Itemnummer"
                size="small"
                name="itemNumber"
                sx={{ width: "100%" }}
                value={inputVal?.itemNumber || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />
            </div>{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              }}
            >
              <div style={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="Straße"
                  size="small"
                  name="street"
                  sx={{ width: "50%" }}
                  value={inputVal.street || ""}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !user?.isAdmin,
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Hausnummer"
                  size="small"
                  name="streetnumber"
                  sx={{ width: "50%" }}
                  value={inputVal?.streetnumber || ""}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !user?.isAdmin,
                  }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="PLZ"
                  size="small"
                  name="zip"
                  sx={{ width: "100%" }}
                  value={inputVal?.zip || ""}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !user?.isAdmin,
                  }}
                />

                <TextField
                  variant="outlined"
                  label="Stadt"
                  size="small"
                  name="city"
                  sx={{ width: "100%" }}
                  value={inputVal?.city || ""}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !user?.isAdmin,
                  }}
                />
              </div>
              <TextField
                variant="outlined"
                label="Land"
                size="small"
                name="country"
                sx={{ width: "100%" }}
                value={inputVal?.country || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />
              {/* <div style={{ display: "flex" }}> */}
              <TextField
                variant="outlined"
                label="Daten 1"
                size="small"
                name="data1"
                sx={{ width: "100%" }}
                value={inputVal?.data1 || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />

              <TextField
                variant="outlined"
                label="Daten 2"
                size="small"
                name="data2"
                sx={{ width: "100%" }}
                value={inputVal?.data2 || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />
              {/* </div> */}
              {/* <div style={{ display: "flex" }}> */}
              <TextField
                variant="outlined"
                label="Daten 3"
                size="small"
                name="data3"
                sx={{ width: "100%" }}
                value={inputVal?.data3 || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />

              <TextField
                variant="outlined"
                label="Daten 4"
                size="small"
                name="data4"
                sx={{ width: "100%" }}
                value={inputVal?.data4 || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />
              {/* </div> */}
              <TextField
                variant="outlined"
                label="Daten 5"
                size="small"
                name="data5"
                sx={{ width: "100%" }}
                value={inputVal?.data5 || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !user?.isAdmin,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {user?.isAdmin && (
                <Button
                  sx={modalStyles.bookingModal.button}
                  variant="contained"
                  color="secondary"
                >
                  Speichern
                </Button>
              )}
              <Button
                sx={modalStyles.bookingModal.button}
                //   onClick={handleDelete}
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                {user?.isAdmin ? "Abbrechen" : "Schliessen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default NfcTagsModal;
