import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { InputLabel, TextField } from "@mui/material";
import { useState } from "react";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function PasswordDialog({
  openPasswordDialog,
  setOpenPasswordDialog,
  setInputVal,
  inputVal,
}) {
  const [password, setPassword] = useState({ pass1: "", pass2: "" });
  const [alert, setAlert] = useState(false);
  const handleClose = () => {
    setPassword({ pass1: "", pass2: "" });
    setOpenPasswordDialog(false);
  };
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const { pass1, pass2 } = password;
    if (pass1 == pass2) {
      setInputVal({ ...inputVal, password: pass1 });
      handleClose();
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      <Dialog
        open={openPasswordDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        {" "}
        <form
          // style={{ rowGap: "5px", display: "flex", flexDirection: "column" }}
          onSubmit={handelSubmit}
        >
          <DialogTitle
            style={{
              cursor: "move",
              fontSize: "1rem",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            id="draggable-dialog-title"
          >
            Passwort ändern{" "}
            {alert && (
              <span style={{ color: "#e10000", fontSize: "0.8rem" }}>
                Passwörter stimmen nicht überein!
              </span>
            )}
          </DialogTitle>

          <DialogContent
            sx={{
              width: 450,
              rowGap: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // border: "2px solid red",
              p: 0,
              paddingInline: 2,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <InputLabel sx={{ width: "65%" }}>
                Neues Passwort eingeben:
              </InputLabel>

              <TextField
                variant="outlined"
                value={password?.pass1 || ""}
                size="small"
                type={"password"}
                name="pass1"
                sx={{ width: "100%" }}
                onChange={handleChange}
                onFocus={() => setAlert(false)}
                required
              />
            </div>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <InputLabel sx={{ width: "65%" }}>
                Neues Passwort bestätigen:
              </InputLabel>

              <TextField
                variant="outlined"
                value={password?.pass2 || ""}
                size="small"
                type={"password"}
                name="pass2"
                sx={{ width: "100%" }}
                onChange={handleChange}
                onFocus={() => setAlert(false)}
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Abbrechen</Button>
            <Button
              autoFocus
              // onClick={handelSubmit}
              variant="contained"
              sx={{ bgcolor: "secondary.main" }}
              type="submit"
            >
              Speichern
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
