export const dashboardStyles = {
  logo: {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    img: { width: "130px", cursor: "pointer" },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    color: "#e10000",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#e10000",
      border: "1px solid #fff",
    },
  },
};
