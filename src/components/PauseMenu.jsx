import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pauseMenuBg from "../assets/pausemenu.png";
import PokemonMenu from "./PokemonMenu";
import BagMenu from "./BagMenu";
import {
  setMessages,
  setPause,
  setKeyHandler,
  setShowBooleanBox,
  setPokemonSelected,
  setMovesMenu,
  setSecondSelect,
} from "../store/gameSlice"; // ✅ Import pause action
import useSaveLoadGame from "../hooks/useSaveLoadGame";
export const PauseMenu = ({
  team,
  items,
  setItems,
  setTeam,
  setCurrentPokemonIndex,
  currentPokemonIndex,
}) => {
  const dispatch = useDispatch();
  const pokemonSelected = useSelector((state) => state.game.pokemonSelected); // ✅ Get pause state
  const secondSelect = useSelector((state) => state.game.secondSelect);
  const movesMenu = useSelector((state) => state.game.movesMenu);

  const isPaused = useSelector((state) => state.game.isPaused); // ✅ Get pause state
  const menuOptions = ["Pokedex", "Pokemon", "Bag", "Save", "Load", "Exit"];
  const [selectedOption, setSelectedOption] = useState(0);
  const [showPokemonMenu, setShowPokemonMenu] = useState(false);
  const [showBagMenu, setShowBagMenu] = useState(false);
  const [selectedBagItem, setSelectedBagItem] = useState(0);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("Paused Menu");

  const { saveGame, loadGame } = useSaveLoadGame();

  const handleKeyDown = (e) => {
    if (!isPaused) return;

    if (!showPokemonMenu && !showBagMenu) {
      if (e.key === " " || e.key === "z") {
        dispatch(setPause(false)); // ✅ Close menu
        dispatch(setMessages([""])); // ✅ Close menu
        dispatch(setKeyHandler("WorldKeyboardHandler")); // ✅ Close menu
      }
      if (e.key === "ArrowUp") {
        setSelectedOption(
          (prev) => (prev - 1 + menuOptions.length) % menuOptions.length
        );
      } else if (e.key === "ArrowDown") {
        setSelectedOption((prev) => (prev + 1) % menuOptions.length);
      } else if (e.key === "Enter" || e.key === "x") {
        if (menuOptions[selectedOption] === "Exit") {
          dispatch(setPause(false)); // ✅ Close menu
          dispatch(setMessages([""])); // ✅ Close menu
          dispatch(setKeyHandler("WorldKeyboardHandler")); // ✅ Close menu
        } else if (menuOptions[selectedOption] === "Pokemon") {
          setShowPokemonMenu(true);
          dispatch(setMessages([""])); // ✅ Close menu
        } else if (menuOptions[selectedOption] === "Bag") {
          setShowBagMenu(true);
        } else if (menuOptions[selectedOption] === "Save") {
          saveGame();
          dispatch(setMessages(["Gamesaved"])); // ✅ Close menu
        } else if (menuOptions[selectedOption] === "Load") {
          loadGame();
          dispatch(setMessages(["Gameload"])); // ✅ Close menu
        }
      }
    } else if (movesMenu && e.key === "z") {
      dispatch(setMovesMenu(false));
      dispatch(setPokemonSelected(true));
    } else if (secondSelect && e.key === "z") {
      dispatch(setSecondSelect(false));
    } else if (pokemonSelected && e.key === "z") {
      dispatch(setPokemonSelected(false));
    } else if (showBagMenu && e.key === "z") {
      setShowBagMenu(false);
    } else if (showPokemonMenu && e.key === "z") {
      setShowPokemonMenu(false);
    }
  };

  useEffect(() => {
    if (isPaused) {
      dispatch(setMessages([currentMessage])); // ✅ Close menu
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isPaused,
    selectedOption,
    showPokemonMenu,
    showBagMenu,
    pokemonSelected,
    secondSelect,
    movesMenu,
  ]);

  if (!isPaused) return null; // ✅ Hide if not paused

  return (
    <div
      style={{
        position: "absolute", // ✅ Keeps it inside the canvas, not fixed to viewport
        top: "0px", // ✅ Position relative to the canvas, not the world
        right: "0px",
        width: `${5 * 32}px`,
        height: `${9 * 32}px`,
        background: `url(${pauseMenuBg}) no-repeat center/contain`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "white",
        fontSize: "16px",
        textAlign: "left",
        lineHeight: "1.5",
        zIndex: 1000, // ✅ Ensures it's above game elements but inside canvas
      }}
    >
      {!showPokemonMenu && !showBagMenu ? (
        <ul
          style={{
            color: "white",
            listStyleType: "none",
            padding: "10px",
            fontSize: "16px",
          }}
        >
          {menuOptions.map((option, index) => (
            <li key={index} style={{ color: "white" }}>
              {selectedOption === index ? "=> " : ""}
              {option}
            </li>
          ))}
        </ul>
      ) : showPokemonMenu ? (
        <span style={{ marginLeft: "20px" }}>
          <PokemonMenu />
        </span>
      ) : (
        <span style={{ marginLeft: "20px" }}>
          <BagMenu />
        </span>
      )}
    </div>
  );
};

export default PauseMenu;
