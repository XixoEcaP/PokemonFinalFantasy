import React from "react";
import { useSelector } from "react-redux";
import playerSprite from "../../assets/cachtingPokeball.png";

const CatchingPokeBall = ({ isPokeball }) => {
  if (!isPokeball) {
    return null; // Fallback if sprite data is not available
  }

  const playerFrame = useSelector((state) => state.battle.pokeballFrame); // frame index: 0-4

  const frameWidth = 32;
  const backgroundOffsetX = -(playerFrame * frameWidth); // shift the sprite sheet

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: "160px",
        backgroundImage: `url(${playerSprite})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${frameWidth * 8}px 160px`, // Scale sprite to full size
        backgroundPosition: `${backgroundOffsetX}px 0px`, // shift frame
        position: "absolute",
        top: "32px",
        right: "64px",
      }}
    />
  );
};

export default CatchingPokeBall;
