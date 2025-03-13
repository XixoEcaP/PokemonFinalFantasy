import React from "react";
import myHpSrc from "../../assets/foedatabox.png";
import HpBar from "./HpBar";

const FoeHp = ({ pokemon }) => {
  return (
    <div
      style={{
        width: "260px",
        height: "62px",
        background: `url(${myHpSrc}) no-repeat center/contain`,
        position: "absolute",
        top: "0px",
        left: "0px",
      }}
    >
      <div
        style={{
          position: "relative",
          left: "80px", // ✅ Adjust freely as you want
          top: "10px", // ✅ Adjust freely as you want
          color: "white",
          fontSize: "18px",
        }}
      >
        {pokemon.stats.hp}/{pokemon.hp} {pokemon.name} Lv.{pokemon.level}
      </div>

      <div
        style={{
          position: "relative",
          left: "118px", // ✅ Adjust freely as you want
          top: "15px", // ✅ Adjust freely as you want
        }}
      >
        <HpBar hp={pokemon.hp} maxHp={pokemon.stats.hp} />
      </div>
    </div>
  );
};

export default FoeHp;
