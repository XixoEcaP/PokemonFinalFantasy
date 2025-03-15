import React from "react";
import { useSelector } from "react-redux";
import Player from "./Player";
import NPC from "./NPC"; // ✅ Import NPC component
import overworldSprite from "../assets/maps/cidlab.png";
import useTileManager from "../hooks/useTileManager";
import useNPCManager from "../hooks/useNPCManager"; // ✅ Import NPC manager
import { Cid, Moogle1, Cloud } from "../data/characters"; // ✅ Import NPC data
import { leviaball, ramball, ifuritoball } from "../data/items";
import Item from "./Item";
import useCidLabTileManager from "../hooks/useCidLabTileManager";

const TILE_SIZE = 32;
const VIEWPORT_WIDTH = 512;
const VIEWPORT_HEIGHT = 384;

function CidLab() {
  useTileManager();
  useCidLabTileManager();

  const events = useSelector((state) => state.game.events); // ✅ Get event states
  const { width, height } = useSelector((state) => state.game.ovmap);
  const { tileX, tileY } = useSelector((state) => state.game.player);

  // ✅ Define items FIRST before filtering
  const items = useNPCManager([leviaball, ramball, ifuritoball]);

  // ✅ Now you can filter items
  const visibleItems = items.filter((item) => {
    if (item === leviaball && events.leviaball) return false;
    if (item === ramball && events.ramball) return false;
    if (item === ifuritoball && events.ifuritoball) return false;
    return true;
  });

  // Get all NPCs for this map
  const npcs = useNPCManager([Cid, Moogle1, Cloud]);
  const visibleChars = npcs.filter((npc) => {
    if (
      npc === Cloud &&
      !events.leviaball &&
      !events.ramball &&
      !events.leviaball
    )
      return false;
    return true;
  }); // ✅ Fetch NPCs dynamically

  const mapWidthPx = width * TILE_SIZE;
  const mapHeightPx = height * TILE_SIZE;

  const playerPxX = tileX * TILE_SIZE;
  const playerPxY = tileY * TILE_SIZE;

  let cameraX = playerPxX - VIEWPORT_WIDTH / 2 + TILE_SIZE / 2;
  let cameraY = playerPxY - VIEWPORT_HEIGHT / 2 + TILE_SIZE / 2;

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

export default CidLab;
