import React from "react";

const FoeSprite = ({ sprite, position }) => {
  if (!sprite) {
    console.error("Sprite not available for FoeSprite"); // Log error if sprite is missing
    return null; // Fallback if sprite data is not available
  }

  return (
    <div
      style={{
        width: "160px",
        height: "160px",
        background: `url(${sprite}) no-repeat center/contain`,
        position: "absolute",
        top: "0",
        right: `${position}px`, // Dynamic position update
      }}
    />
  );
};

export default FoeSprite;
