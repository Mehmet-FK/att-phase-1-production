import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { modalStyles } from "@/styles/modal_styles";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CloseIcon from "@mui/icons-material/Close";
import useAtinaCalls from "@/hooks/useAtinaCalls";

const MultipleEditModal = ({ openModal, setOpenModal, checkboxColumn }) => {
  const { userRoles } = useSelector((state) => state.atina);
  const [roleIds, setRoleIds] = useState([]);
  const { assignMultipleUserRoles } = useAtinaCalls();
  const handleClick = (e) => {
    if (e.target.checked) {
      setRoleIds((pre) => [...pre, e.target.value]);
    } else {
      setRoleIds((pre) => [...pre.filter((x) => x !== e.target.value)]);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setRoleIds([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { selectedRows, data } = checkboxColumn;
    const editedRoles = roleIds.map((id) => Number(id));
    assignMultipleUserRoles(selectedRows, editedRoles, data);
    handleClose();
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          component="form"
          sx={{ ...modalStyles.bookingModal.cardStyle, width: 450 }}
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
              <ChecklistIcon fontSize="large" />
              <Typography variant="h5">Berechtigung zuweisen</Typography>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <CardContent sx={{ width: "100%", p: 1 }}>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              {userRoles?.map((role, i) => (
                <div
                  key={role?.id}
                  style={{
                    padding: "0 18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                >
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    control={
                      <Checkbox
                        value={role?.id}
                        name={role?.name}
                        checked={
                          roleIds?.includes(role?.id.toString()) || false
                        }
                        onClick={handleClick}
                      />
                    }
                    label={
                      <span style={{ fontSize: "0.8rem" }}> {role?.name} </span>
                    }
                  />
                </div>
              ))}
            </FormGroup>
          </CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {" "}
            <Button
              onClick={handleSubmit}
              sx={modalStyles.bookingModal.button}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Speichern
            </Button>
            <Button
              sx={modalStyles.bookingModal.button}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Abbrechen
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default MultipleEditModal;
