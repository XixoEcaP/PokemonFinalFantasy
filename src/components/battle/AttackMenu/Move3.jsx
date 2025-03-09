import React from "react";

const Move3 = ({ isSelected, move, sprite }) => {
  return (
    <div
      style={{
        width: "170px",
        height: "46px",
        background: `url(${sprite}) no-repeat center/contain`,

        position: "absolute",
        top: 0,
        right: "132px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "white",
        fontSize: "16px",
        textAlign: "left",
        lineHeight: "1.5",
        fontFamily: isSelected
          ? '"Pokemon Solid", sans-serif'
          : '"Pokemon Hollow", sans-serif', // Conditionally change the font
      }}
    >
      {/* Conditionally add => before the move name if selected */}
      <span style={{ marginLeft: "20px" }}>{move.name}</span>
    </div>
  );
};

export default Move3;
