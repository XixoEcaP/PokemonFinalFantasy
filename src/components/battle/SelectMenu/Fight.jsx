import React from "react";
import button from "../../../assets/selectMenu/fights.png";
import buttonSelected from "../../../assets/selectMenu/fight.png";

const Fight = ({ isSelected }) => {
  return (
    <div
      style={{
        width: "110px",
        height: "46px",
        background: `url(${
          isSelected ? buttonSelected : button
        }) no-repeat center/contain`,
        position: "absolute",
        top: 0, // Adjust positioning for other items
        left: 0,
      }}
    />
  );
};

export default Fight;
