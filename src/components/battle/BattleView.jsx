import React from "react";
import MyHp from "./MyHp"; // Assuming MyHp and FoeHp are in the same directory
import FoeHp from "./FoeHp";
import battleBoxSrc from "../../assets/battlebg.png";
import FoeSprite from "./FoeSprite";
import MySprite from "./MySprite";
const BattleView = () => {
  return (
    <div
      style={{
        width: "512px",
        height: "288px",
        background: `url(${battleBoxSrc}) no-repeat center/contain`,
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {/* My HP Component */}
      <MyHp />

      {/* Foe HP Component */}
      <FoeHp />
      <FoeSprite />
      <MySprite />
    </div>
  );
};

export default BattleView;
