import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NfcIcon from "@mui/icons-material/Nfc";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Tooltip, Typography } from "@mui/material";
import TapAndPlayOutlinedIcon from "@mui/icons-material/TapAndPlayOutlined";
import Link from "next/link";
import { dashboardStyles } from "@/styles/dashboard_styles";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/settingsSlice";
import SchemaSharpIcon from "@mui/icons-material/SchemaSharp";
import FeedIcon from "@mui/icons-material/Feed";
import dynamic from "next/dynamic";
import Image from "next/image";

const drawerWidth = 240;

const ProfileMenu = dynamic(() => import("@/components/menus/ProfileMenu"));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,

    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children, toggleTheme }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.settings);
  // const { loading } = useSelector((state) => state.atina);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getSessionData = async () => {
    const tempSession = await getSession();

    dispatch(setUser({ user: tempSession?.user }));
  };

  React.useEffect(() => {
    console.log(user);
    getSessionData();
  }, []);

  const drawerList = [
    {
      text: "Mobile Buchungen",
      icon: <LibraryBooksIcon />,
      nav: "mobile-bookings",
    },
    {
      text: "Datensätze",
      icon: <TapAndPlayOutlinedIcon />,
      nav: "items",
    },
    // {
    //   text: "NFC Tags",
    //   icon: <NfcIcon />,
    //   nav: "nfc-tags",
    // },
    {
      text: "Benutzer",
      icon: <PeopleAltIcon />,
      nav: "users",
    },
    {
      text: "Protokoll",
      icon: <FeedIcon />,
      nav: "protocol",
    },
    // {
    //   text: "Admin",
    //   icon: "👨",
    //   nav: "admin",
    // },

    /* {
      text: "Einstellungen",
      icon: <SettingsIcon />,
      nav: "settings",
    }, */
  ];
  return (
    // <Paper elevation={0} sx={{ overflow: "hidden" }}>
    <div style={{ display: "flex" }}>
      {/* <Loading loading={loading} /> */}
      <AppBar
        sx={{ backgroundColor: "navbar.main" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <div style={{ width: open ? 0 : "4rem", transition: "0.3s" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div style={dashboardStyles.logo.wrapper}>
            <Link href={"/"}>
              <Image
                src={"/assets/attensam-logo.svg"}
                alt="logo"
                loading="eager"
                width={150}
                height={50}
                priority
              />
              {/* <img
                style={dashboardStyles.logo.img}
                src={"/assets/attensam-logo.svg"}
                alt="logo"
              /> */}
            </Link>
            <div
              style={{
                display: "flex",
                columnGap: "15px",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                {`${user?.firstname} ${user?.lastname}`}
              </Typography>{" "}
              <Image
                onClick={handleClick}
                src={user?.avatarUrl || "/assets/emptyAvatar.jpg"}
                width={50}
                height={50}
                alt="profilePicture"
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              <ProfileMenu
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                toggleTheme={toggleTheme}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {drawerList.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                display: "block",
                backgroundColor: router.pathname === "/" + item.nav && "#bbbb",
              }}
            >
              <Tooltip title={item.text} placement="right" arrow>
                <Link href={item.nav} style={dashboardStyles.link}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </Tooltip>
            </ListItem>
          ))}

          {user.lastname === "Administrator" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                backgroundColor: router.pathname === "/admin" && "#bbbb",
              }}
            >
              <Tooltip title={"SQL"} placement="right" arrow>
                <Link href={"admin"} style={dashboardStyles.link}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <SchemaSharpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={"SQL"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </Tooltip>
            </ListItem>
          )}
        </List>

        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </div>
  );
}
