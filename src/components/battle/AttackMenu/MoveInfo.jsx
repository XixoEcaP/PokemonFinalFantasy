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
          fontFamily: "fantasy",
        }}
      >
        <div>
          <p>Type: {move.type}</p>
          <p>PP: {movePP}</p>
          <p>{move.category}</p>
        </div>
      </div>
    </>
  );
};

export default MoveInfo;
