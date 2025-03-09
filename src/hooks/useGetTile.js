import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOvmapTiles } from "../store/gameSlice"; // Action for moving NPC sprite
import { pokeball1 } from "../data/items";

export default function useGetTile(npc, npcPosition) {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.game.ovmap.tiles); // Get map tiles
  const events = useSelector((state) => state.game.events); // Check if the NPC is walking

  useEffect(() => {
    if (
      !map ||
      !map[npcPosition.tileY] ||
      !map[npcPosition.tileY][npcPosition.tileX] ||
      (npc.character === pokeball1 && pokeball1)
    ) {
      return; // Skip update if conditions aren't met
    }

    const currentTile = map[npcPosition.tileY][npcPosition.tileX];

    // Only update if tile is not 0
    if (currentTile !== 0) {
      // Create a new map by copying the current one and replacing the NPC's position
      const newMap = map.map((row, rowIndex) => {
        if (rowIndex === npcPosition.tileY) {
          const newRow = [...row]; // Ensure immutability by copying the row
          newRow[npcPosition.tileX] = 0; // Set the current tile to 0
          return newRow;
        }
        return row;
      });

      // Dispatch the action to update the map in Redux store
      dispatch(setOvmapTiles(newMap));

      console.log("NPC moved to tile:", npcPosition);
    }
  }, [npcPosition.tileX, npcPosition.tileY, map, dispatch, events]); // Dependencies that trigger useEffect
}
