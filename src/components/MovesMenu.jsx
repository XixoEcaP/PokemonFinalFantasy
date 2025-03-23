import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import battleBoxSrc from "../assets/messagebox.png";

import Move1 from "./battle/AttackMenu/Move1";
import Move2 from "./battle//AttackMenu/Move2";
import Move3 from "./battle/AttackMenu/Move3";
import Move4 from "./battle/AttackMenu/Move4";
import MoveInfo from "./battle/AttackMenu/MoveInfo";
import { setState } from "../store/battleSlice";
// Import different sprites for each move type
import bugSprite from "../assets/movebattle/bug.png";
import darkSprite from "../assets/movebattle/dark.png";
import dragonSprite from "../assets/movebattle/dragon.png";
import electricSprite from "../assets/movebattle/electric.png";
import fightingSprite from "../assets/movebattle/fighting.png";
import fireSprite from "../assets/movebattle/fire.png";
import flyingSprite from "../assets/movebattle/flying.png";
import ghostSprite from "../assets/movebattle/ghost.png";
import grassSprite from "../assets/movebattle/grass.png";
import groundSprite from "../assets/movebattle/ground.png";
import iceSprite from "../assets/movebattle/ice.png";
import normalSprite from "../assets/movebattle/normal.png";
import poisonSprite from "../assets/movebattle/poison.png";
import psychicSprite from "../assets/movebattle/psychic.png"; // Assuming the correct filename is 'psychic.png'
import rockSprite from "../assets/movebattle/rock.png";
import steelSprite from "../assets/movebattle/steel.png";
import waterSprite from "../assets/movebattle/water.png";
import { setMovesMenu } from "../store/gameSlice";

const moveTypeToSprite = {
  Bug: bugSprite,
  Dark: darkSprite,
  Dragon: dragonSprite,
  Electric: electricSprite,
  Fighting: fightingSprite,
  Fire: fireSprite,
  Flying: flyingSprite,
  Ghost: ghostSprite,
  Grass: grassSprite,
  Ground: groundSprite,
  Ice: iceSprite,
  Normal: normalSprite,
  Poison: poisonSprite,
  Psychic: psychicSprite, // Fixed typo from 'psichic'
  Rock: rockSprite,
  Steel: steelSprite,
  Water: waterSprite,
};

const MovesMenu = () => {
  const dispatch = useDispatch();
  const myTeam = useSelector((state) => state.game.pokemonTeam); // Access myTeam from Redux store
  const AttackMove = useSelector((state) => state.battle.AttackMove); // Access myTeam from Redux store
  const selectedMove = useSelector((state) => state.battle.AttackMove);
  const currentPokemonIndex = useSelector(
    (state) => state.game.currentPokemonIndex
  ); // Access myTeam from Redux store

  const moveMenu = useSelector((state) => state.game.moveMenu); // Access myTeam from Redux store

  const [selected, setSelected] = useState(() => {
    if (!myTeam || !myTeam[currentPokemonIndex]) return 0; // ✅ Ensure myTeam[0] exists

    const index = myTeam[currentPokemonIndex].currentMoves.findIndex(
      (move) => move.name === AttackMove.name
    );

    return index !== -1 ? index : 0; // ✅ Default to first move if not found
  }); // Track selected move index (0 to 3)

  // Check if myTeam is defined and has at least one Pokémon
  const hasValidTeam = myTeam && myTeam[currentPokemonIndex];

  if (!hasValidTeam) {
    return <div>Loading team...</div>;
  }

  let directionMap;
  const numMoves = myTeam[currentPokemonIndex].currentMoves.length;

  if (numMoves === 1) {
    directionMap = {
      0: { up: null, down: null, left: null, right: null },
    };
  } else if (numMoves === 2) {
    directionMap = {
      0: { up: null, down: 1, left: null, right: 1 }, // Move1 -> Move2
      1: { up: 0, down: null, left: 0, right: null }, // Move2 -> Move1
    };
  } else if (numMoves === 3) {
    directionMap = {
      0: { up: null, down: 1, left: null, right: 2 }, // Move1 -> Move2, Move1 -> Move3
      1: { up: 0, down: null, left: null, right: null }, // Move2 -> Move1, Move2 -> Move4
      2: { up: null, down: null, left: 0, right: null }, // Move3 -> Move1, Move3 -> Move4
    };
  } else if (numMoves === 4) {
    directionMap = {
      0: { up: null, down: 1, left: null, right: 2 }, // Move1 -> Move2, Move1 -> Move3
      1: { up: 0, down: null, left: null, right: 3 }, // Move2 -> Move1, Move2 -> Move4
      2: { up: null, down: 3, left: 0, right: null }, // Move3 -> Move1, Move3 -> Move4
      3: { up: 2, down: null, left: 1, right: null }, // Move4 -> Move3, Move4 -> Move2
    };
  }

  useEffect(() => {
    const keyHandler = (e) => {
      let newSelected = selected;

      if (e.key === "ArrowDown" && directionMap[selected].down !== null) {
        newSelected = directionMap[selected].down;
      } else if (e.key === "ArrowUp" && directionMap[selected].up !== null) {
        newSelected = directionMap[selected].up;
      } else if (
        e.key === "ArrowRight" &&
        directionMap[selected].right !== null
      ) {
        newSelected = directionMap[selected].right;
      } else if (
        e.key === "ArrowLeft" &&
        directionMap[selected].left !== null
      ) {
        newSelected = directionMap[selected].left;
      }

      setSelected(newSelected);
    };

    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [selected, moveMenu, directionMap]);

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
      {/* Render Move1 if it exists */}
      {myTeam[0].currentMoves.length > 0 && (
        <Move1
          isSelected={selected === 0}
          move={myTeam[currentPokemonIndex].currentMoves[0]}
          sprite={
            moveTypeToSprite[myTeam[currentPokemonIndex].currentMoves[0]?.type]
          } // Assign sprite based on move type
        />
      )}

      {/* Render Move2 if it exists */}
      {myTeam[0].currentMoves.length > 1 && (
        <Move2
          isSelected={selected === 1}
          move={myTeam[currentPokemonIndex].currentMoves[1]}
          sprite={
            moveTypeToSprite[myTeam[currentPokemonIndex].currentMoves[1]?.type]
          } // Assign sprite based on move type
        />
      )}

      {/* Render Move3 if it exists */}
      {myTeam[0].currentMoves.length > 2 && (
        <Move3
          isSelected={selected === 2}
          move={myTeam[currentPokemonIndex].currentMoves[2]}
          sprite={
            moveTypeToSprite[myTeam[currentPokemonIndex].currentMoves[2]?.type]
          } // Assign sprite based on move type
        />
      )}

      {/* Render Move4 if it exists */}
      {myTeam[currentPokemonIndex].currentMoves.length > 3 && (
        <Move4
          isSelected={selected === 3}
          move={myTeam[currentPokemonIndex].currentMoves[3]}
          sprite={
            moveTypeToSprite[myTeam[currentPokemonIndex].currentMoves[3]?.type]
          } // Assign sprite based on move type
        />
      )}

      {/* Move Info component showing move type and remaining PP */}
      <MoveInfo
        move={myTeam[currentPokemonIndex].currentMoves[selected]}
        movePP={myTeam[currentPokemonIndex].currentMoves[selected].pp} // Pass PP directly from the selected move
      />
    </div>
  );
};

export default MovesMenu;
