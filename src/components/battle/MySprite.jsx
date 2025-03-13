import React from "react";

const MySprite = ({ sprite, position }) => {
  if (!sprite) {
    console.error("Sprite not available for MySprite"); // Log error if sprite is missing
    return null; // Fallback if sprite data is not available
  }

  return (
    <div
      style={{
        width: "160px",
        height: "160px",
        background: `url(${sprite}) no-repeat center/contain`,
        position: "absolute",
        bottom: "0",
        left: `${position}px`, // Dynamic position update
      }}
    />
  );
};

export default MySprite;
