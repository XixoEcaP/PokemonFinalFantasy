import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
import { Cid, Auron } from "../data/characters";
import useCreatePokemon from "./useCreatePokemon";

import {
  setmap,
  setCurrentTileSet,
  setOvmap,
  setPlayerTile,
  setPlayerDirection,
  setMessages,
  setOvmapTiles,
  setGameOver,
  setBattle,
  setTalkingNpc,
  setNpcIsWalking,
  setWalkingSteps,
} from "../store/gameSlice";
import { setFoeTeam } from "../store/battleSlice";
import useGetFoePokemon from "../hooks/useGetFoePokemon";
import pokemons from "../data/pokemonData";

export default function useOVMap1TileManager() {
  const dispatch = useDispatch();
  const { createPokemon } = useCreatePokemon();

  const { tileX, tileY } = useSelector((state) => state.game.player);
  const currentMap = useSelector((state) => state.game.map);
  const currentTileSet = useSelector((state) => state.game.currentTileSet);
  const tiles = useSelector((state) => state.game.ovmap.tiles);
  const gameOver = useSelector((state) => state.game.gameOver);
  const message = useSelector((state) => state.game.message);
  const battle = useSelector((state) => state.game.battle);
  const [newMap, setNewMap] = useState(currentMap);
  const talkingNpc = useSelector((state) => state.game.talkingNpc);

  useEffect(() => {
    if (tileY >= 0 && tileY <= 22) setNewMap("map1");
    else if (tileY >= 23 && tileY <= 71) setNewMap("map2");
    else if (tileY >= 72 && tileY <= 96) setNewMap("map3");

    if (newMap && newMap !== currentMap) {
      dispatch(setmap(newMap));
    }
    if (
      tileX === Auron.tileX &&
      tileY < Auron.tileY + 5 &&
      tileY > Auron.tileY &&
      talkingNpc === ""
    ) {
      dispatch(setTalkingNpc("Auron"));

      dispatch(setMessages(["wooo", "lets Go", "Battling Auron"]));
    }
    if (
      tileX === Auron.tileX &&
      tileY < Auron.tileY + 5 &&
      tileY > Auron.tileY &&
      talkingNpc === "Auron" &&
      message === "wooo"
    ) {
      dispatch(setWalkingSteps(tileY - Auron.tileY - 1));
      dispatch(setNpcIsWalking(true));
    }
    if (
      tileX === Auron.tileX &&
      tileY < Auron.tileY + 5 &&
      tileY > Auron.tileY &&
      talkingNpc === "Auron" &&
      message === "Battling Auron"
    ) {
      const foeTeam = [createPokemon(pokemons.Coeurl, 5)];

      dispatch(setFoeTeam(foeTeam));

      dispatch(setBattle(true));
    }
  }, [tileX, tileY, currentMap, message, talkingNpc]);
}
