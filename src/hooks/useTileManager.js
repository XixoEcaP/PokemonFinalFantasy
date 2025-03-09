import { useEffect } from "react";
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
} from "../store/gameSlice";
import { ifuritoball } from "../data/items";

export default function useTileManager() {
  const dispatch = useDispatch();
  const { tileX, tileY } = useSelector((state) => state.game.player);
  const currentMap = useSelector((state) => state.game.map);
  const currentTileSet = useSelector((state) => state.game.currentTileSet);
  const tiles = useSelector((state) => state.game.ovmap.tiles); // ✅ Get tiles from Redux state
  const overworld = useSelector((state) => state.game.ovmap.ovmap);
  const events = useSelector((state) => state.game.events);

  useEffect(() => {
    let newMap = currentMap; // Start with current map to prevent `undefined`

    if (overworld === "overworld1") {
      // ✅ Fixed typo
      if (tileY >= 0 && tileY <= 22) {
        newMap = "map1";
      } else if (tileY >= 23 && tileY <= 71) {
        newMap = "map2";
      } else if (tileY >= 72 && tileY <= 96) {
        newMap = "map3";
      }
    }

    // ✅ Ensure tiles exist before accessing them
    if (
      tiles &&
      tileY >= 0 &&
      tileY < tiles.length &&
      tileX >= 0 &&
      tileX < tiles[0].length
    ) {
      const newTileSet = tiles[tileY][tileX];

      // ✅ Define non-walkable tiles (0 or any other value)
      const isWalkable = newTileSet >= 1;

      // ✅ Set `currentTileSet` to 0 if unwalkable, otherwise set actual tile value
      const updatedTileSet = isWalkable ? newTileSet : 0;

      if (updatedTileSet !== currentTileSet) {
        dispatch(setCurrentTileSet(updatedTileSet));
      }
    } else {
      // ✅ Out of bounds: Consider it non-walkable
      if (currentTileSet !== 0) {
        dispatch(setCurrentTileSet(0));
      }
    }

    // ✅ Only dispatch `setmap` if newMap is different
    if (newMap && newMap !== currentMap) {
      dispatch(setmap(newMap));
    }
  }, [
    dispatch,
    tileX,
    tileY,
    currentMap,
    currentTileSet,
    tiles,
    overworld,
    setPlayerTile,
    setMessages,
  ]);
}
