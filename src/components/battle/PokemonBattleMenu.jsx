import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pauseMenuBg from "../../assets/pausemenu.png";
import {
  setState,
  setRound,
  swapCurrentPokemon,
  setCurrentPokemonIndex,
} from "../../store/battleSlice";
import { setMessages } from "../../store/gameSlice";

const PokemonBattleMenu = () => {
  const myTeam = useSelector((state) => state.battle.myTeam);
  const dispatch = useDispatch();
  const keyHandler = useSelector((state) => state.game.keyHandler);

  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (keyHandler === "MessageKeyboardHandler") {
      return;
    }

    if (e.key === "ArrowUp") {
      setSelectedPokemonIndex((prev) => {
        const newIndex = (prev - 1 + myTeam.length) % myTeam.length;
        dispatch(setCurrentPokemonIndex(newIndex));
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      setSelectedPokemonIndex((prev) => {
        const newIndex = (prev + 1) % myTeam.length;
        dispatch(setCurrentPokemonIndex(newIndex));
        return newIndex;
      });
    } else if (e.key === "x") {
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
    } else if (e.key === "z" && myTeam[0].hp > 0) {
      dispatch(setState("home"));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPokemonIndex, myTeam, keyHandler]);

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
