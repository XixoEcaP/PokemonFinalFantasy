import { useDispatch, useSelector } from "react-redux";
import {
  setPokemonTeam,
  setEvent,
  setPlayerTile,
  setPlayerDirection,
  setFaster,
  setOvmap,
  setKeyHandler,
  setTalkingNpc,
  setmap,
} from "../store/gameSlice";

const SAVE_KEY = "myPokemonGameSave";

const useSaveLoadGame = () => {
  const dispatch = useDispatch();
  const { pokemonTeam, events, player, ovmap, map } = useSelector(
    (state) => state.game
  );

  const saveGame = () => {
    const saveData = {
      pokemonTeam,
      events,
      player,
      ovmap,
      map,
    };

    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      console.log("✅ Game saved!");
    } catch (err) {
      console.error("❌ Error saving game:", err);
    }
  };

  const loadGame = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (!saved) {
        console.warn("⚠️ No saved game found.");
        return;
      }

      const parsed = JSON.parse(saved);

      // ✅ Dispatch relevant state updates
      dispatch(setPokemonTeam(parsed.pokemonTeam));
      Object.keys(parsed.events).forEach((key) => {
        if (parsed.events[key]) dispatch(setEvent(key));
      });
      dispatch(
        setPlayerTile({
          tileX: parsed.player.tileX,
          tileY: parsed.player.tileY,
        })
      );
      dispatch(setPlayerDirection(parsed.player.direction));
      dispatch(setFaster(parsed.player.faster));
      dispatch(setmap(parsed.map));
      dispatch(
        setOvmap({
          ovmap: parsed.ovmap.ovmap,
          tiles: parsed.ovmap.tiles,
          width: parsed.ovmap.width,
          height: parsed.ovmap.height,
          tileSize: parsed.ovmap.tileSize,
        })
      ); // keep original tiles
      dispatch(setTalkingNpc(""));
      console.log("✅ Game loaded!");
    } catch (err) {
      console.error("❌ Error loading game:", err);
    }
  };

  return { saveGame, loadGame };
};

export default useSaveLoadGame;
