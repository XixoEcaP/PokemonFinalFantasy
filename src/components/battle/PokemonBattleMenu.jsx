import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pauseMenuBg from "../../assets/pausemenu.png";
import { setState, setRound } from "../../store/battleSlice";
import gameSlice, {
  setMessages,
  swapCurrentPokemon,
  setCurrentPokemonIndex,
  setHeal,
} from "../../store/gameSlice";

const PokemonBattleMenu = () => {
  const myTeam = useSelector((state) => state.game.pokemonTeam);
  const dispatch = useDispatch();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const gameState = useSelector((state) => state.battle.state);

  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);

  // ✅ Update Redux AFTER render
  useEffect(() => {
    dispatch(setCurrentPokemonIndex(selectedPokemonIndex));
  }, [selectedPokemonIndex, dispatch]);

  const handleKeyDown = (e) => {
    if (keyHandler === "MessageKeyboardHandler") {
      return;
    }

    if (e.key === "ArrowUp") {
      setSelectedPokemonIndex(
        (prev) => (prev - 1 + myTeam.length) % myTeam.length
      );
    } else if (e.key === "ArrowDown") {
      setSelectedPokemonIndex((prev) => (prev + 1) % myTeam.length);
    } else if (e.key === "x") {
      if (gameState === "bag") {
        dispatch(setHeal({ heal: 20 }));
        dispatch(
          setMessages([
            "Potion used",
            myTeam[selectedPokemonIndex].name + " healed",
          ])
        );
        dispatch(useItem("Potion"));

        dispatch(setRound("pokemonSwap"));
        dispatch(setState("battle"));
        return;
      }
      if (myTeam[selectedPokemonIndex].hp <= 0) {
        dispatch(setMessages(["New Pokemon dead"]));
        return;
      }
      if (selectedPokemonIndex === 0) {
        dispatch(setState("home"));
      } else {
        dispatch(
          setMessages(["New Pokemon: " + myTeam[selectedPokemonIndex].name])
        );
        dispatch(swapCurrentPokemon());
        if (myTeam[0].hp > 0) {
          dispatch(setRound("pokemonSwap"));
          dispatch(setState("battle"));
        } else {
          dispatch(setState("home"));
        }
      }
    } else if (e.key === "z" && gameState !== "bag" && myTeam[0].hp > 0) {
      dispatch(setState("home"));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPokemonIndex, myTeam, keyHandler, gameState]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: `${5 * 32}px`,
        height: `${9 * 32}px`,
        background: `url(${pauseMenuBg}) no-repeat center/contain`,
        color: "white",
        fontSize: "16px",
        lineHeight: "1.5",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {myTeam.map((pokemon, index) => (
        <div
          key={index}
          style={{
            marginLeft: "20px",
          }}
        >
          {selectedPokemonIndex === index ? "=> " : ""}
          {pokemon.name}
        </div>
      ))}
    </div>
  );
};

export default PokemonBattleMenu;
