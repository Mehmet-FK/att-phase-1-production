import React from "react";

const TotalEntries = ({ totalEntries }) => {
  return (
    <div
      style={{
        display: "flex",
        columnGap: "5px",
        alignItems: "center",
        paddingLeft: "2px",
      }}
    >
      <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>Gesamt:</span>
      <span style={{ fontSize: "0.8rem" }}>
        {totalEntries?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </span>
    </div>
  );
};

export default TotalEntries;
