import React from "react";

const HpBar = ({ hp, maxHp }) => {
  const hpPercentage = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  return (
    <div
      style={{
        width: "96px",
        height: "4px",
        backgroundColor: "#ccc", // grey background for missing HP
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${hpPercentage}%`,
          height: "100%",
          backgroundColor: "green",
        }}
      />
    </div>
  );
};

export default HpBar;
