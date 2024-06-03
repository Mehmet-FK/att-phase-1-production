import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import ModalTab from "./UserModal_components/ModalTabs";
import { modalStyles } from "@/styles/modal_styles";
import { useSelector } from "react-redux";
import RolesList from "./UserModal_components/RolesList";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PasswordDialog from "./UserModal_components/PasswordDialog";
// import placeholder from "/assets/placeholder.jpg";

const UserModal = ({ setOpenUserModal, openUserModal, userInfo }) => {
  const initInputVal = useMemo(
    () => ({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      personnelnumber: "",
      roleIds: [],
    }),
    []
  );
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputVal, setInputVal] = useState(userInfo);
  const [roleIds, setRoleIds] = useState(userInfo?.roles);
  const { user } = useSelector((state) => state.settings);
  // To keep the value of which tab is selected
  const [tab, setTab] = useState("Allgemein");
  const [tabValue, setTabValue] = useState(0);

  const { putUserData, postUserData } = useAtinaCalls();
  const { client, settlement } = useSelector((state) => state.atina);

  const handleClose = () => {
    setOpenUserModal(false);
  };
  const handleImageInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      const base64String = fileContent.split(",")[1];
      // console.log(base64String);
      setSelectedImage(fileContent);
      setInputVal({ ...inputVal, image: base64String });
    };
    reader?.readAsDataURL(selectedFile);
  };
  const handleChange = (e) => {
    if (!user?.isAdmin) return;
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (userInfo) {
      // let parameter = {
      //   ...inputVal,
      //   personnelNumber: inputVal.personnelnumber,
      // };
      // delete parameter.personnelnumber;

      // console.log(inputVal);
      putUserData(inputVal);
      handleClose();
    } else {
      postUserData(inputVal);
      setInputVal(initInputVal);
      handleClose();
    }
  };

  useEffect(() => {
    if (userInfo) {
      setRoleIds(userInfo?.roles);
      setInputVal({ ...userInfo?.userInfo, roleIds: userInfo?.roles });
    } else {
      setInputVal(initInputVal);
      setRoleIds([]);
    }
  }, [userInfo]);
  useEffect(() => {
    setTab("Allgemein");
    setTabValue(0);
  }, [openUserModal]);

  return (
    <>
      <PasswordDialog
        setOpenPasswordDialog={setOpenPasswordDialog}
        openPasswordDialog={openPasswordDialog}
        setInputVal={setInputVal}
        inputVal={inputVal}
      />
      <Modal
        open={openUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyles.userModal.cardStyle}>
          <ModalTab
            setTab={setTab}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
          {/* if tab is "Allgemein" this part will be shown */}
          {tab === "Allgemein" && (
            <div style={{ marginTop: -15 }}>
              {/* ============== ⇩ It is going to be necessary ⇩ ========== */}

              {/* <label htmlFor="imgInput"> */}

              <div
                style={{
                  height: "15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "7rem",
                  color: "#00000033",
                  backgroundColor: "#a5a6a7dd",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={
                    userInfo?.avatarUrl
                      ? userInfo?.avatarUrl
                      : "/assets/placeholder.jpg"
                  }
                  alt="profile-pic"
                />
                {/* <PhotoCameraIcon
                    sx={{
                      cursor: "pointer",
                      position: "absolute",
                      mixBlendMode: "multiply",
                    }}
                    fontSize="inherit"
                    color="inherit"
                  /> */}
                {/* <input
                    // ref={inputRef}
                    style={modalStyles.userModal.input}
                    id="imgInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                  /> */}
              </div>

              {/* </label> */}
              <CardContent sx={modalStyles.userModal.content}>
                <div style={modalStyles.userModal.inputGroup}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      // border: "2px solid red",
                    }}
                  >
                    <FormControl
                      sx={{ minWidth: 120, width: "100%" }}
                      size="small"
                      disabled={!user?.isAdmin}
                    >
                      <InputLabel id="mandant">Mandant</InputLabel>
                      <Select
                        sx={{ width: "100%" }}
                        labelId="mandant"
                        id="demo-select-small"
                        value={inputVal?.client || ""}
                        label="Mandant"
                        readOnly={!user?.isAdmin}
                        onChange={(e) =>
                          setInputVal({ ...inputVal, client: e.target.value })
                        }
                        MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                      >
                        <MenuItem value={""}>
                          <Typography
                            component="em"
                            sx={{ fontSize: "0.7rem" }}
                          >
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
                      variant="outlined"
                      label="Mandant"
                      size="small"
                      name="client"
                      sx={{ width: "100%" }}
                      value={inputVal?.client || ""}
                      onChange={handleChange}
                    />{" "} */}
                    <FormControl
                      sx={{
                        minWidth: 120,
                        width: "100%",
                      }}
                      size="small"
                      disabled={!user?.isAdmin}
                    >
                      <InputLabel id="standort">Standort</InputLabel>
                      <Select
                        sx={{ width: "100%", maxHeight: "50px" }}
                        labelId="standort"
                        id="demo-select-small"
                        value={inputVal?.settlement || ""}
                        label="standort"
                        readOnly={!user?.isAdmin}
                        onChange={(e) =>
                          setInputVal({
                            ...inputVal,
                            settlement: e.target.value,
                          })
                        }
                        MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                      >
                        {/* <div style={{ maxHeight: "200px" }}> */}
                        <MenuItem value={""}>
                          <Typography
                            component="em"
                            sx={{ fontSize: "0.7rem" }}
                          >
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
                        {/* </div> */}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "8px",
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Vorname"
                    size="small"
                    name="firstname"
                    required
                    value={inputVal?.firstname || ""}
                    onChange={handleChange}
                    disabled={!user?.isAdmin}
                  />

                  <TextField
                    variant="outlined"
                    label="Nachname"
                    size="small"
                    name="lastname"
                    required
                    value={inputVal?.lastname || ""}
                    onChange={handleChange}
                    disabled={!user?.isAdmin}
                  />

                  <TextField
                    variant="outlined"
                    label="Personalnummer"
                    size="small"
                    name="personnelnumber"
                    required
                    value={inputVal?.personnelnumber || ""}
                    onChange={handleChange}
                    disabled={!user?.isAdmin}
                  />
                </div>
                <TextField
                  variant="outlined"
                  label="Benutzername"
                  size="small"
                  name="username"
                  sx={{ width: "100%" }}
                  value={inputVal?.username || ""}
                  onChange={handleChange}
                  required
                  disabled={!user?.isAdmin}
                />{" "}
                {!userInfo && (
                  <TextField
                    variant="outlined"
                    label="Kennwort"
                    size="small"
                    type={visible ? "text" : "password"}
                    name="password"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                    value={inputVal?.password || ""}
                    required={userInfo ? false : true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!visible && (
                            <VisibilityOffIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                          {visible && (
                            <VisibilityIcon
                              onClick={() => setVisible(!visible)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}{" "}
                {user?.isAdmin && userInfo && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: "-35px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        paddingLeft: "10px",
                        width: "55%",
                      }}
                    >
                      Passwort:
                    </span>
                    <Button
                      size="small"
                      sx={{ width: "45%", bgcolor: "secondary.main" }}
                      variant="contained"
                      onClick={() => setOpenPasswordDialog(true)}
                    >
                      Passwort ändern
                    </Button>
                  </div>
                )}
              </CardContent>
            </div>
          )}
          {/* if tab is "Rolle" this part will be shown */}
          {tab === "Rolle" && (
            <RolesList
              inputVal={inputVal}
              setInputVal={setInputVal}
              setRoleIds={setRoleIds}
              roleIds={roleIds}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              columnGap: "10px",
            }}
          >
            {user?.isAdmin && (
              <Button
                onClick={handleSubmit}
                sx={modalStyles.userModal.button}
                variant="contained"
              >
                Speichern
              </Button>
            )}
            <Button
              sx={modalStyles.userModal.button}
              onClick={handleClose}
              variant="contained"
            >
              {user?.isAdmin ? "Abbrechen" : "Schließen"}
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default UserModal;
