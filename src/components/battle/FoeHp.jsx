import React from "react";
import foeHpSrc from "../../assets/foedatabox.png"; // Make sure the image path is correct

const FoeHp = () => {
  return (
    <div
      style={{
        width: "260px",
        height: "62px",
        background: `url(${foeHpSrc}) no-repeat center/contain`,
        position: "absolute",
        bottom: 0,
        right: 0, // Position it in the bottom-left corner
      }}
    />
  );
};

export default FoeHp;
