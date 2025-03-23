import button from "../../../assets/booleanbox.png";
import React from "react";
const MoveInfo = ({ move, movePP }) => {
  return (
    <>
      <div
        style={{
          width: "124px",
          height: "96px",
          background: `url(${button}) no-repeat center/contain`,
          position: "absolute",
          top: 0, // Adjust positioning for other items
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "13px",
        }}
      >
        <div style={{ margin: "1px 0" }}>
          <p style={{ margin: "1px 0" }}>Type: {move.type}</p>
          <p style={{ margin: "1px 0" }}>PP: {movePP}</p>
          <p style={{ margin: "1px 0" }}>Power: {move.power}</p>
          <p style={{ margin: "1px 0" }}>{move.category}</p>
        </div>
      </div>
    </>
  );
};

export default MoveInfo;
