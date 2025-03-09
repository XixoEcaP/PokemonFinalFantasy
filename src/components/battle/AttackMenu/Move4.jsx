import React from "react";
import button from "../../../assets/movebattle/normal.png";

const Move4 = ({ isSelected, move, sprite }) => {
  return (
    <div
      style={{
        width: "170px",
        height: "46px",
        background: `url(${sprite}) no-repeat center/contain`,

        position: "absolute",
        bottom: 0,
        right: "132px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "white",
        fontSize: "14px",
        textAlign: "left",
        lineHeight: "1.5",
        fontFamily: '"Public Pixel", sans-serif',
      }}
    >
      {/* Conditionally add => before the move name if selected */}
      <span style={{ marginLeft: "20px" }}>
        {isSelected ? "=> " : ""} {move.name}
      </span>
    </div>
  );
};

export default Move4;
