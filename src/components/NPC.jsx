import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveTalkingNpc, setOvmapTiles } from "../store/gameSlice"; // Action for moving NPC sprite
import {
  OverworldMap1Tiles2,
  OverworldMap1Tiles,
  CidLabTiles,
} from "../data/mapChunks";
import useGetTile from "../hooks/useGetTile";

const TILE_SIZE = 32;
const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 48;
const FRAME_COUNT = 4;

export default function NPC({ npc }) {
  const dispatch = useDispatch();
  const talkingNpc = useSelector((state) => state.game.talkingNpc); // Get active NPC
  const npcIsWalking = useSelector((state) => state.game.npcIsWalking); // Check if the NPC is walking
  const keyHandler = useSelector((state) => state.game.keyHandler); // Check if the NPC is walking
  const map = useSelector((state) => state.game.ovmap.tiles); // Check if the NPC is walking
  const walkingSteps = useSelector((state) => state.game.walkingSteps); // Check if the NPC is walking
  const walkingDirection = useSelector((state) => state.game.walkingDirection); // Check if the NPC is walking

  const playerX = useSelector((state) => state.game.player.tileX); // Player position
  const playerY = useSelector((state) => state.game.player.tileY); // Player position

  // Set the number of steps
  const stepCount = useRef(0); // Track the current step count using useRef

  const [animFrame, setAnimFrame] = useState(0);
  const [npcPosition, setNpcPosition] = useState({
    tileX: npc.tileX,
    tileY: npc.tileY,
  });
  const [npcDirection, setNpcDirection] = useState(npc.direction);

  const moveNpc = (dx, dy) => {
    dispatch(moveTalkingNpc({ character: npc.character, dx, dy }));
  };

  const isTalking =
    keyHandler === "MessageKeyboardHandler" && talkingNpc === npc.character;

  // Update NPC direction when talking to the player
  useEffect(() => {
    if (isTalking && !npcIsWalking) {
      const dx = playerX - npc.tileX;
      const dy = playerY - npc.tileY;

      if (Math.abs(dx) > Math.abs(dy)) {
        setNpcDirection(dx > 0 ? 2 : 1); // Right : Left
      } else {
        setNpcDirection(dy > 0 ? 0 : 3); // Down : Up
      }
    } else {
      setNpcDirection(npc.direction); // Reset to default direction
    }
  }, [isTalking, playerX, playerY, npcIsWalking]);

  // Handle NPC movement when it's walking and count steps
  useEffect(() => {
    if (npcIsWalking && talkingNpc === npc.character) {
      const interval = setInterval(() => {
        if (stepCount.current >= walkingSteps) {
          clearInterval(interval); // Stop the interval once steps are completed
          return;
        }
        setNpcDirection(walkingDirection);
        const dx = walkingDirection === 2 ? 1 : walkingDirection === 1 ? -1 : 0;
        const dy = walkingDirection === 0 ? 1 : walkingDirection === 3 ? -1 : 0;

        moveNpc(dx, dy);

        setNpcPosition((prev) => ({
          tileX: prev.tileX + dx,
          tileY: prev.tileY + dy,
        }));

        stepCount.current += 1;
      }, 300); // Move every 200ms

      return () => {
        clearInterval(interval);
      };
    } else if (talkingNpc === npc.character && npc.walks) {
      setNpcDirection(walkingDirection);
    }
  }, [
    npcIsWalking,
    talkingNpc,
    walkingDirection,
    npcDirection,
    isTalking,
    walkingSteps,
  ]);

  useGetTile(npc, npcPosition);

  // Update animation frame when walking
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
    }, 150);

    return () => clearInterval(animationInterval); // Cleanup animation interval
  }, []);

  const left = npcPosition.tileX * TILE_SIZE;
  const top = npcPosition.tileY * TILE_SIZE - (SPRITE_HEIGHT - TILE_SIZE);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
        background: `url(${npc.sprite}) -${animFrame * SPRITE_WIDTH}px -${
          npcDirection * SPRITE_HEIGHT
        }px no-repeat`,
      }}
    />
  );
}
