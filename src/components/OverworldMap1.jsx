import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Player from "./Player";
import overworldSprite from "../assets/overworld1.png";
import useTileManager from "../hooks/useTileManager";
import { Auron } from "../data/characters"; // ✅ Import NPC data
import { pokeball1 } from "../data/items";
import Item from "./Item";
import NPC from "./NPC";
import useNPCManager from "../hooks/useNPCManager";
import PauseMenu from "./PauseMenu";
import { setItems, setPokemonTeam } from "../store/gameSlice";
import useOVMap1TileManager from "../hooks/useOVMap1TileManager";

const TILE_SIZE = 32;
const VIEWPORT_WIDTH = 512;
const VIEWPORT_HEIGHT = 384;

function OverworldMap1() {
  useTileManager();
  useOVMap1TileManager();
  const dispatch = useDispatch();

  const { width, height } = useSelector((state) => state.game.ovmap);
  const { tileX, tileY } = useSelector((state) => state.game.player);
  const events = useSelector((state) => state.game.events);

  // ✅ Now you can filter items
  const items = useNPCManager([pokeball1]);

  // ✅ Now you can filter items
  const visibleItems = items.filter((item) => {
    if (item === pokeball1 && events.pokeball1) return false;
    return true;
  });

  // Get all NPCs for this map
  const npcs = useNPCManager([Auron]);
  const visibleChars = npcs.filter((npc) => {
    if (
      npc === Auron &&
      (events.leviaball || events.ramball || events.ifuritoball)
    ) {
      return false;
    }

    return true;
  }); // ✅ Fetch NPCs dynamically
  // Total map dimensions in pixels
  const mapWidthPx = width * TILE_SIZE;
  const mapHeightPx = height * TILE_SIZE;

  // Convert player's tile coordinates to pixel positions
  const playerPxX = tileX * TILE_SIZE;
  const playerPxY = tileY * TILE_SIZE;

  // Center the camera on the player
  let cameraX = playerPxX - VIEWPORT_WIDTH / 2 + TILE_SIZE / 2;
  let cameraY = playerPxY - VIEWPORT_HEIGHT / 2 + TILE_SIZE / 2;

  // Clamp the camera to stay within map bounds
  cameraX = Math.max(0, Math.min(cameraX, mapWidthPx - VIEWPORT_WIDTH));
  cameraY = Math.max(0, Math.min(cameraY, mapHeightPx - VIEWPORT_HEIGHT));

  return (
    <div
      style={{
        position: "absolute",
        width: mapWidthPx,
        height: mapHeightPx,
        transform: `translate(${-cameraX}px, ${-cameraY}px)`,
        background: `url(${overworldSprite}) repeat`,
      }}
    >
      <Player />

      {visibleChars.map((npc, index) => (
        <NPC key={index} npc={npc} />
      ))}
      {visibleItems.map((npc, index) => (
        <Item key={index} npc={npc} />
      ))}
    </div>
  );
}

export default OverworldMap1;
