import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import button from "../assets/booleanbox.png";
import {
  setMovesMenu,
  setPokemonSelected,
  setSecondSelect,
} from "../store/gameSlice";

const SelectedPokemon = () => {
  const [selectedOption, setSelectedOption] = useState(0); // 0 = Switch, 1 = Moves
  const options = ["Switch", "Moves", "Exit"];
  const secondSelect = useSelector((state) => state.game.secondSelect);

  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    if (secondSelect) {
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      setSelectedOption((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      setSelectedOption((prev) => (prev + 1) % options.length);
    } else if (e.key.toLowerCase() === "x") {
      console.log(`Selected option: ${options[selectedOption]}`);
      if (options[selectedOption] === "Exit") {
        dispatch(setPokemonSelected(false));
      } else if (options[selectedOption] === "Switch") {
        dispatch(setSecondSelect(true));
      } else if (options[selectedOption] === "Moves") {
        dispatch(setPokemonSelected(false));
        dispatch(setMovesMenu(true));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedOption, secondSelect]);

  return (
    <div
      style={{
        bottom: "-6px",
        right: "0",
        width: "124px",
        height: "96px",
        background: `url(${button}) no-repeat center/contain`,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "13px",
        flexDirection: "column",
        paddingTop: "10px",
        marginTop: "0",
      }}
    >
      {options.map((option, index) => (
        <p key={index} style={{ margin: "3px 0" }}>
          {selectedOption === index ? "=> " : ""}
          {option}
        </p>
      ))}
    </div>
  );
};

export default SelectedPokemon;
