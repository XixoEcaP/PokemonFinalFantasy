import React from "react";
import foeSprite from "../../assets/pokemons/ahriman.png"; // Make sure the image path is correct

const FoeSprite = () => {
  return (
    <div
      style={{
        width: "160px",
        height: "160px",
        background: `url(${foeSprite}) no-repeat center/contain`,
        position: "absolute",
        top: 0,
        right: 0, // Position it in the bottom-left corner
      }}
    />
  );
};

export default FoeSprite;
