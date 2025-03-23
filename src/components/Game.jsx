// src/components/Game.jsx
import React from "react";
import OverworldMap from "./OverworldMap";
import useMessageHandler from "./MessageKeyHanlder";
import { useSelector, useDispatch } from "react-redux"; // ✅ Import
import MessageBox from "./MessageBox";
import BooleanBox from "./BooleanBox";
import PauseMenu from "./PauseMenu";
import { setItems, setPokemonTeam } from "../store/gameSlice";
import useWroldKeyHandler from "./KeyHandler";
import Battle from "./Battle";
import SelectedPokemon from "./SelectedPokemon";
import MovesMenu from "./MovesMenu";

function Game() {
  useMessageHandler();
  useWroldKeyHandler();

  const message = useSelector((state) => state.game.message);
  const booleanBox = useSelector((state) => state.game.booleanBox);
  const team = useSelector((state) => state.game.pokemonTeam);
  const items = useSelector((state) => state.game.items);
  const battle = useSelector((state) => state.game.battle);
  const movesMenu = useSelector((state) => state.game.movesMenu);
  const pokemonSelected = useSelector((state) => state.game.pokemonSelected);
  console.log(pokemonSelected);

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
      {" "}
      <PauseMenu
        team={team || []}
        items={items || []}
        setItems={setItems || (() => {})}
        setTeam={setPokemonTeam || (() => {})}
        setCurrentPokemonIndex={() => {}}
        currentPokemonIndex={0}
      />{" "}
      <OverworldMap />
      {battle && <Battle />}
      {message && <MessageBox />}
      {booleanBox && <BooleanBox />}
      {movesMenu && <MovesMenu />}
      {pokemonSelected && <SelectedPokemon />}
    </div>
  );
}

export default Game;
