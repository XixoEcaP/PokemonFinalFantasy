import React from "react";

const Move1 = ({ isSelected, move, sprite }) => {
  return (
    <div
      style={{
        width: "170px",
        height: "46px",
        background: `url(${sprite}) no-repeat center/contain`, // Dynamically set the sprite
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "white",
        fontSize: "16px",
        textAlign: "left",
        lineHeight: "1.5",
        fontFamily: isSelected
          ? '"Pokemon Solid", sans-serif'
          : '"Pokemon Hollow", sans-serif',
      }}
    >
      {/* Conditionally add => before the move name if selected */}
      <span style={{ marginLeft: "20px" }}>
        {move.name} {/* Display move name */}
      </span>
    </div>
  );
};

export default Move1;
