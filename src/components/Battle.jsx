import React from "react";
import BattleView from "./battle/BattleView";
import BattleMenu from "./battle/BattleMenu";

const Battle = () => {
  return (
    <div
      style={{
        width: "512px",
        height: "384px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid black",
      }}
    >
      {/* Battle View Component */}
      <BattleView />

      {/* Battle Menu Component */}
      <BattleMenu />
    </div>
  );
};

export default Battle;
