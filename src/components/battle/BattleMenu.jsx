import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import battleBoxSrc from "../../assets/messagebox.png";
import SelectMenu from "./SelectMenu";
import AttackMenu from "./AttackMenu";
import PokemonBattleMenu from "./PokemonBattleMenu";

const BattleMenu = () => {
  const gameState = useSelector((state) => state.battle.state); // Get state from the store
  const [currentMenu, setCurrentMenu] = useState("select"); // Default menu is select

  // Use useEffect to monitor state changes and set the menu accordingly
  useEffect(() => {
    if (gameState === "fight") {
      setCurrentMenu("fight");
    }
    if (gameState === "home") {
      setCurrentMenu("home");
    }

    if (gameState === "battle") {
      setCurrentMenu("battle");
    }
  }, [gameState]); // Runs whenever gameState changes

  return (
    <div
      style={{
        width: "512px",
        height: "96px",
        background: `url(${battleBoxSrc}) no-repeat center/contain`,
        backgroundSize: "cover",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      {/* Conditionally render based on the currentMenu state */}
      {currentMenu === "home" && <SelectMenu />}
      {currentMenu === "fight" && <AttackMenu />}
    </div>
  );
};

export default BattleMenu;
