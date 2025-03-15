import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
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
} from "../store/gameSlice";
import { setFoeTeam } from "../store/battleSlice";
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
  const [newMap, setNewMap] = useState(currentMap);
  const getFoePokemon = useGetFoePokemon();

  useEffect(() => {
    if (
      tiles &&
      tileY >= 0 &&
      tileY < tiles.length &&
      tileX >= 0 &&
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

      if (updatedTileSet === 2 && !battle && random > 95) {
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
    if (gameOver && message === "") {
      dispatch(
        setOvmap({
          ovmap: "overworldmap1",
          width: 32,
          height: 96,
          tileSize: 32,
          tiles: OverworldMap1Tiles2,
        })
      );
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
    getFoePokemon, // ✅ Now stable due to useCallback
  ]);
}
