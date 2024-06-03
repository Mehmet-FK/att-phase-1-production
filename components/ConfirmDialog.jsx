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

export default function ConfirmDialog({ openDialog, setOpenDialog, data }) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  const { deleteAtinaItems } = useAtinaCalls();
  const handleDelete = () => {
    console.log(data);
    // const response = deleteAtinaItems(data.id);
    // handleClose();
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Löschen bestätigen
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Die Löschung dieses Datensatzes kann nicht rückgängig gemacht
            werden. Möchten Sie fortfahren?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            abbrechen
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{ bgcolor: "#e10000" }}
          >
            löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
