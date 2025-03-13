import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState, setRound, setSwapped } from "../../store/battleSlice";
import { setMessages } from "../../store/gameSlice";
import Fight from "./SelectMenu/Fight";
import Bag from "./SelectMenu/Bag";
import Pokemon from "./SelectMenu/Pokemon";
import Run from "./SelectMenu/Run";

const SelectMenu = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.battle.state);
  const swapped = useSelector((state) => state.battle.swapped);
  const foeTeam = useSelector((state) => state.battle.foeTeam);

  const keyHandlerG = useSelector((state) => state.game.keyHandler);
  const round = useSelector((state) => state.battle.round);

  // Track selected option, each option is represented by a unique index
  const [selected, setSelected] = useState(2); // Index for selected item (0 to 3)

  // Define the direction map for grid-based navigation
  const directionMap = {
    0: { up: null, down: 3, left: 2, right: null }, // Pokemon
    1: { up: 2, down: null, left: null, right: 3 }, // Bag
    2: { up: null, down: 1, left: null, right: 0 }, // Fight
    3: { up: 0, down: null, left: 1, right: null }, // Run
  };

  // Handle key events
  const keyHandler = (e) => {
    if (gameState !== "home" || keyHandlerG === "MessageKeyboardHandler") {
      return;
    }
    let newSelected = selected;

    if (e.key === "ArrowDown" && directionMap[selected].down !== null) {
      newSelected = directionMap[selected].down; // Move Down
    } else if (e.key === "ArrowUp" && directionMap[selected].up !== null) {
      newSelected = directionMap[selected].up; // Move Up
    } else if (e.key === "ArrowLeft" && directionMap[selected].left !== null) {
      newSelected = directionMap[selected].left; // Move Left
    } else if (
      e.key === "ArrowRight" &&
      directionMap[selected].right !== null
    ) {
      newSelected = directionMap[selected].right; // Move Right
    } else if (e.key === "x") {
      // Dispatch action based on selected option
      handleSelect(newSelected);
    }

    // Update the selected option based on the direction
    setSelected(newSelected);
  };

  // Handle option selection and dispatch state
  const handleSelect = (selectedOption) => {
    if (selectedOption === 0) {
      console.log("Pokemon selected");
      dispatch(setState("pokemonMenu"));
    } else if (selectedOption === 1) {
      console.log("Bag selected");
      dispatch(setState("bag"));
    } else if (selectedOption === 2) {
      console.log("Fight selected");
      dispatch(setState("fight"));
    } else if (selectedOption === 3) {
      console.log("Run selected");
      dispatch(setState("run"));
    }
  };

  // Listen for key press events
  useEffect(() => {
    if (gameState === "home") {
      if (swapped) {
        dispatch(setMessages(["New Pokemon " + foeTeam[0].name]));

        dispatch(setSwapped(false));
      }

      dispatch(setRound("0"));

      window.addEventListener("keydown", keyHandler);
    }
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [selected, keyHandlerG, gameState, swapped]);

  return (
    <div
      style={{
        height: "96px",
        width: "246px",
        backgroundSize: "cover",
        position: "absolute",
        bottom: 0,
        right: 0,
      }}
    >
      {/* Render each option with conditional sprite change based on selected */}
      <Pokemon isSelected={selected === 0} />
      <Bag isSelected={selected === 1} />
      <Fight isSelected={selected === 2} />
      <Run isSelected={selected === 3} />
    </div>
  );
};

export default SelectMenu;
