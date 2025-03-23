import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessages,
  setPokemonSelected,
  setSecondSelect,
  setCurrentPokemonIndex,
  swapPokemonIndex,
} from "../store/gameSlice";

const PokemonMenu = ({ disabled }) => {
  const dispatch = useDispatch();
  const myTeam = useSelector((state) => state.game.pokemonTeam);
  const pokemonSelected = useSelector((state) => state.game.pokemonSelected);
  const secondSelect = useSelector((state) => state.game.secondSelect);
  const movesMenu = useSelector((state) => state.game.movesMenu);

  const currentPokemonIndex = useSelector(
    (state) => state.game.currentPokemonIndex
  );

  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState(
    selectedPokemonIndex === 0 ? 1 : 0
  );

  // Sync first selection
  useEffect(() => {
    if (!secondSelect) {
      dispatch(setCurrentPokemonIndex(selectedPokemonIndex));
    }
  }, [selectedPokemonIndex, secondSelect, dispatch]);

  // Phase 1 - Select First Pokémon
  const handleFirstSelectionKeys = (e) => {
    if (disabled || pokemonSelected || secondSelect || movesMenu) return;

    if (e.key === "ArrowUp") {
      setSelectedPokemonIndex(
        (prev) => (prev - 1 + myTeam.length) % myTeam.length
      );
      if (selectedPokemonIndex < 1) {
        dispatch(setMessages([`${myTeam[myTeam.length - 1].name}`]));
      } else {
        dispatch(
          setMessages([`${myTeam[selectedPokemonIndex - 1].name}`, "hoooooo"])
        );
      }
    } else if (e.key === "ArrowDown") {
      setSelectedPokemonIndex((prev) => (prev + 1) % myTeam.length);

      if (selectedPokemonIndex > myTeam.length - 2) {
        dispatch(setMessages([`${myTeam[0].name}`]));
      } else {
        dispatch(setMessages([`${myTeam[selectedPokemonIndex + 1].name}`]));
      }
    } else if (e.key.toLowerCase() === "x") {
      const selected = myTeam[selectedPokemonIndex];
      if (selected) {
        dispatch(setMessages([selected.name]));
        dispatch(setPokemonSelected(true));
      }
    }
  };

  // Phase 2 - Select Second Pokémon (for switch)
  useEffect(() => {
    if (!secondSelect) return;

    const handleSecondSelection = (e) => {
      if (e.key === "ArrowUp") {
        setSecondSelectedIndex((prev) => {
          let next = (prev - 1 + myTeam.length) % myTeam.length;
          return next === currentPokemonIndex
            ? (next - 1 + myTeam.length) % myTeam.length
            : next;
        });
      } else if (e.key === "ArrowDown") {
        setSecondSelectedIndex((prev) => {
          let next = (prev + 1) % myTeam.length;
          return next === currentPokemonIndex
            ? (next + 1) % myTeam.length
            : next;
        });
      } else if (e.key.toLowerCase() === "x") {
        if (secondSelectedIndex !== currentPokemonIndex) {
          dispatch(
            swapPokemonIndex({
              firstIndex: currentPokemonIndex,
              secondIndex: secondSelectedIndex,
            })
          );
        }
        setCurrentPokemonIndex(secondSelect);
        dispatch(setCurrentPokemonIndex(secondSelectedIndex));
        dispatch(setSecondSelect(false));
        dispatch(setPokemonSelected(false));
      }
    };

    window.addEventListener("keydown", handleSecondSelection);
    return () => window.removeEventListener("keydown", handleSecondSelection);
  }, [
    movesMenu,
    secondSelect,
    secondSelectedIndex,
    currentPokemonIndex,
    myTeam.length,
    dispatch,
  ]);

  useEffect(() => {
    if (!secondSelect && !movesMenu) {
      window.addEventListener("keydown", handleFirstSelectionKeys);
      return () =>
        window.removeEventListener("keydown", handleFirstSelectionKeys);
    }
  }, [
    movesMenu,
    selectedPokemonIndex,
    myTeam.length,
    disabled,
    pokemonSelected,
    secondSelect,
  ]);

  return (
    <div>
      {myTeam.map((pokemon, index) => {
        let marker = " ";
        if (!secondSelect && selectedPokemonIndex === index) marker = "=>";
        if (secondSelect) {
          if (index === currentPokemonIndex) marker = "=>"; // fixed first pick
          else if (index === secondSelectedIndex) marker = "=>"; // moving pick
        }

        return (
          <div key={index} style={{ fontSize: "14px" }}>
            {marker} {pokemon.name} (Lvl: {pokemon.level})
          </div>
        );
      })}
    </div>
  );
};

export default PokemonMenu;
