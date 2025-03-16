import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
import { Auron, Auron2, Auron3 } from "../data/characters";
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
  setWalkingDirection,
  setStepCount,
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
      tileX === Auron3.tileX &&
      tileY < Auron3.tileY + 5 &&
      tileY > Auron3.tileY &&
      talkingNpc === "" &&
      !battle
    ) {
      dispatch(setTalkingNpc("Auron3"));

      dispatch(setMessages(["wooo", "lets Go", "Battling Auron"]));
    }
    if (
      tileX === Auron3.tileX &&
      tileY < Auron3.tileY + 5 &&
      tileY > Auron3.tileY &&
      talkingNpc === "Auron3" &&
      message === "wooo"
    ) {
      dispatch(setWalkingSteps(tileY - Auron3.tileY - 1));
      dispatch(setNpcIsWalking(true));
      dispatch(setWalkingDirection(Auron3.direction));
    }
    if (
      tileX === Auron3.tileX &&
      tileY < Auron3.tileY + 5 &&
      tileY > Auron3.tileY &&
      talkingNpc === "Auron3" &&
      message === "Battling Auron"
    ) {
      const foeTeam = [createPokemon(pokemons.Coeurl, 5)];
      dispatch(setOvmapTiles(OverworldMap1Tiles2));

      dispatch(setFoeTeam(foeTeam));

      dispatch(setBattle(true));
      dispatch(setTalkingNpc(""));
      dispatch(setWalkingSteps(0));

      dispatch(setStepCount(0));
      dispatch(setNpcIsWalking(false));
    }
    if (
      tileY === Auron2.tileY &&
      tileX > Auron2.tileX - 7 &&
      tileX < Auron2.tileX &&
      talkingNpc === "" &&
      !battle
    ) {
      dispatch(setTalkingNpc("Auron2"));

      dispatch(setMessages(["wooo", "lets Go", "Battling Auron"]));
    }
    if (
      tileY === Auron2.tileY &&
      tileX > Auron2.tileX - 7 &&
      tileX < Auron2.tileX &&
      talkingNpc === "Auron2" &&
      message === "wooo"
    ) {
      dispatch(setWalkingDirection(Auron2.direction));

      dispatch(setWalkingSteps(Auron2.tileX - tileX - 1));
      dispatch(setNpcIsWalking(true));
    }
    if (
      tileY === Auron2.tileY &&
      tileX > Auron2.tileX - 7 &&
      tileX < Auron2.tileX &&
      talkingNpc === "Auron2" &&
      message === "Battling Auron"
    ) {
      const foeTeam = [createPokemon(pokemons.Coeurl, 5)];
      dispatch(setOvmapTiles(OverworldMap1Tiles2));
      dispatch(setTalkingNpc(""));
      dispatch(setNpcIsWalking(false));
      dispatch(setWalkingSteps(0));

      dispatch(setStepCount(0));

      dispatch(setFoeTeam(foeTeam));

      dispatch(setBattle(true));
    }
  }, [tileX, tileY, currentMap, message, talkingNpc]);
}
