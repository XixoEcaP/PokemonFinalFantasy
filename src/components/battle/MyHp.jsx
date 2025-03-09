import React from "react";
import myHpSrc from "../../assets/foedatabox.png"; // Make sure the image path is correct

const MyHp = () => {
  return (
    <div
      style={{
        width: "260px",
        height: "62px",
        background: `url(${myHpSrc}) no-repeat center/contain`,
        position: "absolute",
        top: 0,
        left: 0, // Position it in the top-right corner
      }}
    />
  );
};

export default MyHp;
