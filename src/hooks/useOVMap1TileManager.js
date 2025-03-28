import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
import { Auron, Auron2, Auron3 } from "../data/characters";
import useCreatePokemon from "./useCreatePokemon";
import { setPokemonTeam } from "../store/gameSlice";
import { setmap } from "../store/gameSlice";
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
  const pokemonTeam = useSelector((state) => state.game.pokemonTeam);
  const trainer1 = useSelector((state) => state.game.events.trainer1);
  const trainer2 = useSelector((state) => state.game.events.trainer2);

  useEffect(() => {
    if (tileY >= 0 && tileY <= 22) setNewMap("map1");
    else if (tileY >= 23 && tileY <= 71) setNewMap("map2");
    else if (tileY >= 72 && tileY <= 96) setNewMap("map3");

    if (newMap && newMap !== currentMap) {
      dispatch(setmap(newMap));
    }
  }, [tileX, tileY, currentMap, message, talkingNpc, gameOver, battle]);
}
