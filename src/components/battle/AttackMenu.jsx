import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import battleBoxSrc from "../../assets/messagebox.png";
import Move1 from "./AttackMenu/Move1";
import Move2 from "./AttackMenu/Move2";
import Move3 from "./AttackMenu/Move3";
import Move4 from "./AttackMenu/Move4";
import MoveInfo from "./AttackMenu/MoveInfo";
import { setState, setAttackMove, setmovePP } from "../../store/battleSlice";

// Import different sprites for each move type
import fireSprite from "../../assets/movebattle/fire.png";
import waterSprite from "../../assets/movebattle/water.png";
import electricSprite from "../../assets/movebattle/electric.png";
import normalSprite from "../../assets/movebattle/normal.png";

const moveTypeToSprite = {
  Fire: fireSprite,
  Water: waterSprite,
  Electric: electricSprite,
  Normal: normalSprite, // Default sprite for normal moves
};

const AttackMenu = () => {
  const dispatch = useDispatch();
  const myTeam = useSelector((state) => state.battle.myTeam); // Access myTeam from Redux store
  const movePP = useSelector((state) => state.battle.movePP); // Access PP from Redux store

  const selectedMove = useSelector((state) => state.battle.AttackMove);
  const [selected, setSelected] = useState(0); // Track selected move index (0 to 3)

  // Check if myTeam is defined and has at least one Pokémon
  const hasValidTeam = myTeam && myTeam[0];

  if (!hasValidTeam) {
    return <div>Loading team...</div>;
  }

  let directionMap;
  const numMoves = myTeam[0].currentMoves.length;

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
    } else if (e.key === "ArrowLeft" && directionMap[selected].left !== null) {
      newSelected = directionMap[selected].left;
    } else if (e.key === "x") {
      dispatch(setState("fight"));
      // Decrease PP for the selected move in myTeam[0]
      const updatedMovePP = myTeam[0].currentMoves[selected].pp - 1;
      dispatch(setmovePP({ moveIndex: selected, newPP: updatedMovePP }));
      dispatch(setAttackMove(myTeam[0].currentMoves[selected])); // Set the selected attack move
    } else if (e.key === "z") {
      dispatch(setState("home"));
    }

    setSelected(newSelected);
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [selected]);

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
          move={myTeam[0].currentMoves[0]}
          sprite={moveTypeToSprite[myTeam[0].currentMoves[0]?.type]} // Assign sprite based on move type
        />
      )}

      {/* Render Move2 if it exists */}
      {myTeam[0].currentMoves.length > 1 && (
        <Move2
          isSelected={selected === 1}
          move={myTeam[0].currentMoves[1]}
          sprite={moveTypeToSprite[myTeam[0].currentMoves[1]?.type]} // Assign sprite based on move type
        />
      )}

      {/* Render Move3 if it exists */}
      {myTeam[0].currentMoves.length > 2 && (
        <Move3
          isSelected={selected === 2}
          move={myTeam[0].currentMoves[2]}
          sprite={moveTypeToSprite[myTeam[0].currentMoves[2]?.type]} // Assign sprite based on move type
        />
      )}

      {/* Render Move4 if it exists */}
      {myTeam[0].currentMoves.length > 3 && (
        <Move4
          isSelected={selected === 3}
          move={myTeam[0].currentMoves[3]}
          sprite={moveTypeToSprite[myTeam[0].currentMoves[3]?.type]} // Assign sprite based on move type
        />
      )}

      {/* Move Info component showing move type and remaining PP */}
      <MoveInfo
        move={myTeam[0].currentMoves[selected]}
        movePP={myTeam[0].currentMoves[selected].pp} // Pass PP directly from the selected move
      />
    </div>
  );
};

export default AttackMenu;
