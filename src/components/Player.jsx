// src/components/Player.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import playerSprite from "../assets/player.png";
import { setPlayerWalking } from "../store/gameSlice";

const TILE_SIZE = 32;
const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 48;

function Player() {
  const { tileX, tileY, direction, isWalking, faster } = useSelector(
    (state) => state.game.player
  );
  const dispatch = useDispatch();
  const [animFrame, setAnimFrame] = useState(1);

  // Determine stepping delay based on speed flag:
  const stepDelay = faster ? 300 : 200;

  useEffect(() => {
    let timeoutId1, timeoutId2, timeoutId3;

    if (isWalking) {
      // Immediately show stepping frame 1
      setAnimFrame(2);
      // After stepDelay ms, change to stepping frame 2
      timeoutId1 = setTimeout(() => {
        setAnimFrame(3);
        // After another stepDelay ms, reset walking flag (idle frame 0)
        timeoutId2 = setTimeout(() => {
          setAnimFrame(0);
          timeoutId3 = setTimeout(() => {
            dispatch(setPlayerWalking(false));
          }, stepDelay);
        }, stepDelay);
      }, stepDelay);
    } else {
      setAnimFrame(1);
    }
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [isWalking, dispatch, stepDelay]);

  // Convert tile coordinates to pixel positions (with vertical offset so the feet align)
  const left = tileX * TILE_SIZE;
  const top = tileY * TILE_SIZE - (SPRITE_HEIGHT - TILE_SIZE);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
        background: `url(${playerSprite}) -${animFrame * SPRITE_WIDTH}px -${
          direction * SPRITE_HEIGHT
        }px no-repeat`,
      }}
    />
  );
}

export default Player;
