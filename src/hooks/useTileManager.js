import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
import {
  setEvent,
  setmap,
  setCurrentTileSet,
  setOvmap,
  setPlayerTile,
  setPlayerDirection,
  setMessages,
  setOvmapTiles,
  setGameOver,
  setBattle,
  synchronizePokemonHp,
  setTalkingNpc,
} from "../store/gameSlice";
import { setFoeTeam, setMyTeam } from "../store/battleSlice";
import useGetFoePokemon from "../hooks/useGetFoePokemon";

export default function useTileManager() {
  const dispatch = useDispatch();
  const { tileX, tileY } = useSelector((state) => state.game.player);
  const currentMap = useSelector((state) => state.game.map);
  const currentTileSet = useSelector((state) => state.game.currentTileSet);
  const tiles = useSelector((state) => state.game.ovmap.tiles);
  const overworld = useSelector((state) => state.game.ovmap.ovmap);
  const gameOver = useSelector((state) => state.game.gameOver);
  const message = useSelector((state) => state.game.message);
  const battle = useSelector((state) => state.game.battle);
  const pokemonTeam = useSelector((state) => state.game.pokemonTeam);
  const npcIsWalking = useSelector((state) => state.game.npcIsWalking);

  const [newMap, setNewMap] = useState(currentMap);
  const getFoePokemon = useGetFoePokemon();

  useEffect(() => {
    if (
      tiles &&
      tileY >= 0 &&
      (tileY < tiles.length) & (tileX >= 0) &&
      tileX < tiles[0].length
    ) {
      const newTileSet = tiles[tileY][tileX];
      const isWalkable = newTileSet >= 1;
      const updatedTileSet = isWalkable ? newTileSet : 0;
      if (updatedTileSet !== currentTileSet) {
        dispatch(setCurrentTileSet(updatedTileSet));
      }

      // ✅ Battle logic (Only calls function inside useEffect)
      const random = Math.floor(Math.random() * 100);

      if (updatedTileSet === 2 && !battle && !npcIsWalking && random > 93) {
        dispatch(setMyTeam(pokemonTeam));

        const foePokemon = getFoePokemon(); // Now this function is stable and won't cause re-renders
        if (foePokemon) {
          dispatch(setMessages([foePokemon.name + " has appear"]));
          dispatch(setFoeTeam([foePokemon]));
          dispatch(setBattle(true));
        }
      }
    } else {
      if (currentTileSet !== 0) {
        dispatch(setCurrentTileSet(0));
      }
    }
    if (gameOver) {
      dispatch(
        setOvmap({
          ovmap: "overworldmap1",
          width: 32,
          height: 96,
          tileSize: 32,
          tiles: OverworldMap1Tiles2,
        })
      );
      dispatch(synchronizePokemonHp());
      dispatch(setTalkingNpc(""));

      dispatch(setPlayerTile({ tileX: 18, tileY: 80 }));
      dispatch(setPlayerDirection(0));
      dispatch(setGameOver(false));
    }
  }, [
    dispatch,
    tileX,
    tileY,
    currentMap,
    currentTileSet,
    tiles,
    overworld,
    gameOver,
    message,
    getFoePokemon,
    npcIsWalking,
    // ✅ Now stable due to useCallback
  ]);
}
