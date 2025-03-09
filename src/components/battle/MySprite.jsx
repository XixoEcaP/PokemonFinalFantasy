import React from "react";
import mySprite from "../../assets/pokemons/bombback.png"; // Make sure the image path is correct

const FoeHp = () => {
  return (
    <div
      style={{
        width: "160px",
        height: "160px",
        background: `url(${mySprite}) no-repeat center/contain`,
        position: "absolute",
        bottom: 0,
        left: 0, // Position it in the bottom-left corner
      }}
    />
  );
};

export default FoeHp;
