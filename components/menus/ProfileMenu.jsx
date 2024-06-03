import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { signOut } from "next-auth/react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
const ProfileMenu = ({ anchorEl, setAnchorEl, toggleTheme }) => {
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            toggleTheme();
          }}
          sx={{
            display: "flex",
            justifyContent: "start",

            // border: "2px solid red",
            pt: 0,
            pb: 0,
            // paddingInlineStart: 0,
          }}
        >
          <IconButton
            sx={{
              color: "toggleBtn.main",
            }}
          >
            <PowerSettingsNewIcon color="inherit" fontSize="small" />
          </IconButton>
          {/* <DarkModeSwitch toggleTheme={toggleTheme} />{" "} */}
          <p style={{ fontSize: "0.8rem" }}>Darkmode</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            signOut();
          }}
          sx={{
            display: "flex",
            justifyContent: "start",
            pt: 0,
            pb: 0,
          }}
        >
          <IconButton>
            <Logout fontSize="small" />
          </IconButton>
          <p style={{ fontSize: "0.8rem" }}>Ausloggen</p>
        </MenuItem>
      </Menu>
    </>
  );
};
export default ProfileMenu;
