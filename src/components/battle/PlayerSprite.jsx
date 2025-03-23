import React from "react";
import { useSelector } from "react-redux";
import playerSprite from "../../assets/playerBack.png";

const PlayerSprite = () => {
  const playerFrame = useSelector((state) => state.battle.playerFrame); // frame index: 0-4

  const frameWidth = 160;
  const backgroundOffsetX = -(playerFrame * frameWidth); // shift the sprite sheet

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: "160px",
        backgroundImage: `url(${playerSprite})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${frameWidth * 5}px 160px`, // Scale sprite to full size
        backgroundPosition: `${backgroundOffsetX}px 0px`, // shift frame
        position: "absolute",
        bottom: "0",
        left: "0",
      }}
    />
  );
};

export default PlayerSprite;
