import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOvmapTiles } from "../store/gameSlice"; // Action for moving NPC sprite
import useGetTile from "../hooks/useGetTile";
import { pokeball1 } from "../data/items";
import {
  CidLabTiles,
  OverworldMap1Tiles,
  OverworldMap1Tiles2,
} from "../data/mapChunks";

const TILE_SIZE = 32;
const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 32;
const FRAME_COUNT = 4;

export default function Item({ npc }) {
  const [animFrame, setAnimFrame] = useState(0);
  const dispatch = useDispatch();

  if (!npc) return null;
  const left = npc.tileX * TILE_SIZE;
  const top = npc.tileY * TILE_SIZE - (SPRITE_HEIGHT - TILE_SIZE);
  const direction = npc.direction || 0;
  const [npcPosition, setNpcPosition] = useState({
    tileX: npc.tileX,
    tileY: npc.tileY,
  });

  useGetTile(npc, npcPosition);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
        background: `url(${npc.sprite}) -${animFrame * SPRITE_WIDTH}px -${
          direction * SPRITE_HEIGHT
        }px no-repeat`,
      }}
    />
  );
}
