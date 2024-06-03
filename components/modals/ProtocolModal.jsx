import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, Typography, IconButton, Grid } from "@mui/material";
import { memo } from "react";
import { modalStyles } from "@/styles/modal_styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloseIcon from "@mui/icons-material/Close";
import FeedIcon from "@mui/icons-material/Feed";

const ProtocolModal = ({
  setOpenProtocolModal,
  openProtocolModal,
  protocol,
}) => {
  const handleClose = () => {
    setOpenProtocolModal(false);
  };
  return (
    <>
      <Modal
        open={openProtocolModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyles.protocolModal.cardStyle}>
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
              <FeedIcon fontSize="large" />
              <Typography variant="h5">Protokoll</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <CardContent sx={modalStyles.protocolModal.content}>
            <Grid rowGap={0.5} container>
              {" "}
              <Grid item md={6}>
                <TextField
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Erstellt am"
                  size="small"
                  sx={{ width: "100%" }}
                  name="createdDate"
                  value={
                    new Date(protocol?.createdDate).toLocaleDateString("tr") ||
                    ""
                  }
                />{" "}
              </Grid>
              <Grid item md={6}>
                <TextField
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Uhrzeit"
                  size="small"
                  sx={{ width: "100%" }}
                  name="createdTime"
                  value={
                    protocol.createdTime?.slice(
                      0,
                      protocol.createdTime?.lastIndexOf(":")
                    ) || ""
                  }
                />{" "}
              </Grid>
              <Grid item md={6}>
                <TextField
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Datensatz"
                  size="small"
                  sx={{ width: "100%" }}
                  name="item"
                  value={protocol.item || ""}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Modul"
                  size="small"
                  sx={{ width: "100%" }}
                  name="module"
                  value={protocol.module || ""}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Benutzer ID"
                  size="small"
                  sx={{ width: "100%" }}
                  name="userId"
                  value={protocol.userId || ""}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  disabled={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  label="Protokolltyp"
                  size="small"
                  sx={{ width: "100%" }}
                  name="protocoltype"
                  value={protocol.protocoltype || ""}
                />
              </Grid>
              <TextField
                disabled={true}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                label="Beschreibung"
                size="small"
                sx={{ width: "100%" }}
                name="description"
                value={protocol.description || ""}
                multiline
                minRows={13}
              />
            </Grid>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "1rem",
              }}
            >
              <Button
                sx={modalStyles.protocolModal.button}
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Schließen
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default memo(ProtocolModal);
