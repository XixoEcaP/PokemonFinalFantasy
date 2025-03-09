import React from "react";
import button from "../../../assets/selectMenu/runs.png";
import buttonSelected from "../../../assets/selectMenu/run.png";

const Run = ({ isSelected }) => {
  return (
    <div
      style={{
        width: "110px",
        height: "46px",
        background: `url(${
          isSelected ? buttonSelected : button
        }) no-repeat center/contain`,
        position: "absolute",
        bottom: 0, // Adjust positioning for other items
        right: 0,
      }}
    />
  );
};

export default Run;
