export const tableStyles = {
  tableContainer: {
    margin: "auto",
    padding: "0.5rem 10px",
    position: "relative",
    maxWidth: "95vw",
    maxHeight: "90vh",
    overflow: "auto",
  },
  tableHead: {
    position: "sticky",
    top: 30,
    backgroundColor: "background.paper",
    opacity: 1,
    zIndex: 5,
  },
  helpersWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "sticky",
    top: -10,
    left: 0,
    backgroundColor: "background.paper",
    opacity: 1,
    zIndex: 5,
  },
  th: {
    cell: {
      textTransform: "capitalize",
      fontWeight: "600",
      // color: "#888",
      fontSize: "0.7rem",
      cursor: "pointer",
      borderRight: "1px solid #ddd",
      userSelect: "none",
      padding: "8px 0 8px 0",
    },
  },
  tr: {
    row: {
      // "&:last-child td, &:last-child th": { border: 0 },
      "&:hover": { backgroundColor: "#bbbb" },
    },
    cell: {
      fontSize: "0.7em",
      borderRight: "0.5px solid #ccc",
    },
    image: {
      transition: "0.3s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2)",
        zIndex: "4",
      },
    },
  },
};
