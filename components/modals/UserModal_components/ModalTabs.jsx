import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  paddingTop: "5px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#e10000",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    color: "auto",
    border: "1px solid #ddd",
    borderBottomColor: "transparent",
    borderRadius: "10px 10px 0 0",

    "&.Mui-selected": {
      color: "#e10000",
      boxShadow:
        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#fff",
    },
  })
);

export default function ModalTab({ setTab, tabValue, setTabValue }) {
  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <StyledTabs
        value={tabValue}
        onChange={handleChange}
        aria-label="styled tabs example"
      >
        <StyledTab onClick={() => setTab("Allgemein")} label="Benutzer" />
        <StyledTab onClick={() => setTab("Rolle")} label="Berechtigungen" />
      </StyledTabs>
    </>
  );
}
