import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveTalkingNpc,
  setMessages,
  setAnimatedNpc,
  setWalkingDirection,
  setStepCount,
  setTalkingNpc,
  setBattle,
  setBattleNpc,
  setEvent,
  setWalkingSteps,
  setNpcIsWalking,
  setOvmapTiles,
  addItem,
  setBattleVictory,
} from "../store/gameSlice";

import useGetTile from "../hooks/useGetTile";
import { setFoeTeam, setRound, setRunable } from "../store/battleSlice";

const TILE_SIZE = 32;
const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 48;
const FRAME_COUNT = 4;

export default function NPC({ npc }) {
  const dispatch = useDispatch();
  const talkingNpc = useSelector((state) => state.game.talkingNpc);
  const npcIsWalking = useSelector((state) => state.game.npcIsWalking);
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const animatedNpc = useSelector((state) => state.game.animatedNpc);
  const walkingSteps = useSelector((state) => state.game.walkingSteps);
  const walkingDirection = useSelector((state) => state.game.walkingDirection);
  const booleanBox = useSelector((state) => state.game.booleanBox);
  const nextX = useSelector((state) => state.game.next.nextX);
  const nextY = useSelector((state) => state.game.next.nextY);
  const battle = useSelector((state) => state.game.battle);
  const message = useSelector((state) => state.game.message);
  const messages = useSelector((state) => state.game.messages);
  const events = useSelector((state) => state.game.events);
  const battleNpc = useSelector((state) => state.game.battleNpc);
  const battleVictory = useSelector((state) => state.game.battleVictory);
  const ovTiles = useSelector((state) => state.game.ovmap.ovTiles);
  const gameOver = useSelector((state) => state.game.gameOver);

  const playerX = useSelector((state) => state.game.player.tileX);
  const playerY = useSelector((state) => state.game.player.tileY);
  const stepCount = useSelector((state) => state.game.stepCount);

  const [animFrame, setAnimFrame] = useState(0);
  const [npcPosition, setNpcPosition] = useState({
    tileX: npc.tileX,
    tileY: npc.tileY,
  });
  const [npcDirection, setNpcDirection] = useState(npc.direction);

  const moveNpc = (dx, dy) => {
    dispatch(moveTalkingNpc({ character: npc.character, dx, dy }));
  };

  const isTalking = talkingNpc === npc.character;

  useEffect(() => {
    if ((isTalking && !npcIsWalking) || booleanBox) {
      const dx = playerX - npcPosition.tileX;
      const dy = playerY - npcPosition.tileY;

      if (Math.abs(dx) > Math.abs(dy)) {
        setNpcDirection(dx > 0 ? 2 : 1);
      } else {
        setNpcDirection(dy > 0 ? 0 : 3);
      }
    } else {
      setNpcDirection(npc.direction);
      if (npc.walks) {
        setNpcDirection(npcDirection);
      }
    }
  }, [isTalking, playerX, playerY, npcIsWalking]);

  useEffect(() => {
    if (animatedNpc === npc.character && npc.walks && walkingDirection) {
      setNpcDirection(walkingDirection);
    }
    if (npcIsWalking && animatedNpc === npc.character) {
      const interval = setInterval(() => {
        if (stepCount >= walkingSteps) {
          clearInterval(interval);
          dispatch(setNpcIsWalking(false));
          return;
        }
        const dx = walkingDirection === 2 ? 1 : walkingDirection === 1 ? -1 : 0;
        const dy = walkingDirection === 0 ? 1 : walkingDirection === 3 ? -1 : 0;

        moveNpc(dx, dy);
        setNpcDirection(walkingDirection);

        setNpcPosition((prev) => ({
          tileX: prev.tileX + dx,
          tileY: prev.tileY + dy,
        }));

        dispatch(setStepCount(stepCount + 1));
      }, 300);

      return () => clearInterval(interval);
    }
  }, [npcIsWalking, animatedNpc, walkingDirection, stepCount]);

  useEffect(() => {
    if (
      !gameOver &&
      animatedNpc === npc.character &&
      !npcIsWalking &&
      npc.trainer &&
      !battle &&
      message === "" &&
      !events[npc.event]
    ) {
      dispatch(setRound(false));

      dispatch(setFoeTeam(npc.team));
      dispatch(setBattle(true));
      dispatch(setMessages(npc.battleMessages || ["Battle"]));
      dispatch(setBattleNpc(npc.character));
      dispatch(setOvmapTiles(ovTiles));
      dispatch(setWalkingSteps(0));
      dispatch(setStepCount(0));
    }
  }, [
    animatedNpc,
    npcIsWalking,
    npc,
    battle,
    message,
    events,
    dispatch,
    gameOver,
  ]);

  useEffect(() => {
    if (nextX === npcPosition.tileX && nextY === npcPosition.tileY) {
      dispatch(setTalkingNpc(npc.character));
      if (npc.messages && !battle && message === "") {
        dispatch(setMessages(npc.messages));
        if (npc.items) {
          dispatch(addItem("Pokeball"));
        }
      }
    }
  }, [nextX, nextY, npcPosition, battle]);

  useEffect(() => {
    if (
      npc.trainer &&
      battleVictory &&
      battleNpc === npc.character &&
      !events[npc.event]
    ) {
      dispatch(setEvent(npc.event));
      dispatch(setAnimatedNpc(""));
      dispatch(setRunable(true));
      dispatch(setBattleVictory(false));
    }
  }, [battleVictory, battleNpc, npc, events, dispatch]);

  useEffect(() => {
    if (
      npc.trainer &&
      !battle &&
      !events[npc.event] &&
      message === "" &&
      animatedNpc === "" &&
      !npcIsWalking &&
      npc.range
    ) {
      const dx = playerX - npcPosition.tileX;
      const dy = playerY - npcPosition.tileY;

      if (Math.abs(dx) <= npc.range && dy === 0) {
        dispatch(setRunable(false));

        dispatch(setAnimatedNpc(npc.character));
        dispatch(setWalkingDirection(dx > 0 ? 2 : 1));
        dispatch(setWalkingSteps(Math.abs(dx) - 1));
        dispatch(setMessages(npc.walkingMessages || ["Battle"]));
        dispatch(setNpcIsWalking(true));
        setNpcDirection(walkingDirection);
      } else if (Math.abs(dy) <= npc.range && dx === 0) {
        dispatch(setRunable(false));

        dispatch(setAnimatedNpc(npc.character));
        dispatch(setWalkingDirection(dy > 0 ? 0 : 3));
        dispatch(setWalkingSteps(Math.abs(dy) - 1));
        dispatch(setMessages(npc.walkingMessages || ["Battle"]));
        dispatch(setNpcIsWalking(true));
        setNpcDirection(walkingDirection);
      }
    }
  }, [
    npc,
    playerX,
    playerY,
    battle,
    message,
    events,
    animatedNpc,
    npcIsWalking,
    npcPosition,
  ]);

  useGetTile(npc, npcPosition);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimFrame((prevFrame) => (prevFrame + 1) % FRAME_COUNT);
    }, 150);

    return () => clearInterval(animationInterval);
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
