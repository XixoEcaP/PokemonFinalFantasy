import React from "react";
import { useSelector } from "react-redux";
import specialSprite from "../../assets/battleAnimations/special.png";

const FoeSpecialMove = () => {
  const moveFrame = useSelector((state) => state.battle.moveFrame); // frame index: 0-4

  const frameWidth = 32;
  const backgroundOffsetX = -(moveFrame * frameWidth); // shift the sprite sheet

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: "160px",
        backgroundImage: `url(${specialSprite})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${frameWidth * 9}px 32px`, // Scale sprite to full size
        backgroundPosition: `${backgroundOffsetX}px 0px`, // shift frame
        position: "absolute",
        top: "204px",
        left: "64px",
      }}
    />
  );
};

export default FoeSpecialMove;
