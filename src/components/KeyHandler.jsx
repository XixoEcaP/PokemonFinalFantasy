import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  movePlayer,
  setPlayerDirection,
  setPlayerWalking,
  setFaster,
  nextMessage,
  setPause,
  setKeyHandler,
} from "../store/gameSlice";
import useCheckTile from "./useCheckTile";

export default function useWroldKeyHandler() {
  const dispatch = useDispatch();
  const { tileX, tileY, direction, faster } = useSelector(
    (state) => state.game.player
  );
  const tiles = useSelector((state) => state.game.ovmap.tiles);
  const checkTile = useCheckTile();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const messages = useSelector((state) => state.game.messages);
  const isPaused = useSelector((state) => state.game.isPaused);
  const throttleTime = faster ? 50 : 300;
  const movementIntervalRef = useRef(null);
  const currentKeyActive = useRef(false);
  const walkTimeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        dispatch(setPause(!isPaused));
        dispatch(setKeyHandler("PauseKeyHandler"));
      }
      if (e.key.toLowerCase() === "z") {
        dispatch(setFaster(true));
        dispatch(setPlayerWalking(true));
        return;
      }

      if (e.key.toLowerCase() === "x") {
        if (keyHandler === "MessageKeyboardHandler") {
          dispatch(nextMessage());
        }
        if (keyHandler === "WorldKeyboardHandler") {
          checkTile();
        }

        return;
      }

      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        return;
      }

      let dx = 0,
        dy = 0,
        newDirection = null;
      let nextX = tileX,
        nextY = tileY;
      if (keyHandler === "WorldKeyboardHandler") {
        switch (e.key) {
          case "ArrowUp":
            newDirection = 3;
            dy = -1;
            nextY = tileY - 1;
            break;
          case "ArrowDown":
            newDirection = 0;
            dy = 1;
            nextY = tileY + 1;
            break;
          case "ArrowLeft":
            newDirection = 1;
            dx = -1;
            nextX = tileX - 1;
            break;
          case "ArrowRight":
            newDirection = 2;
            dx = 1;
            nextX = tileX + 1;
            break;
        }

        // ✅ If player is already facing the direction, move
        if (direction === newDirection) {
          dispatch(setPlayerWalking(true));

          // ✅ Check if movement is possible
          if (
            tiles &&
            nextY >= 0 &&
            nextY < tiles.length &&
            nextX >= 0 &&
            nextX < tiles[0].length
          ) {
            const nextTile = tiles[nextY][nextX];
            if (nextTile < 1) {
              return;
            }
          } else {
            return;
          }

          currentKeyActive.current = true;
          dispatch(movePlayer({ dx, dy }));

          movementIntervalRef.current = setInterval(() => {
            dispatch(movePlayer({ dx, dy }));
            dispatch(setPlayerWalking(true));
          }, throttleTime);
        } else {
          // ✅ If player is facing another direction, turn first without moving
          dispatch(setPlayerDirection(newDirection));
        }
      }
    };
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === "z") {
        dispatch(setFaster(false));
        return;
      }
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        return;
      }
      if (currentKeyActive.current) {
        if (movementIntervalRef.current) {
          clearInterval(movementIntervalRef.current);
          movementIntervalRef.current = null;
        }
        walkTimeoutRef.current = setTimeout(() => {
          dispatch(setPlayerWalking(false));
        }, 1000);
        currentKeyActive.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (movementIntervalRef.current)
        clearInterval(movementIntervalRef.current);
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
    };
  }, [
    isPaused,
    dispatch,
    throttleTime,
    tileX,
    tileY,
    tiles,
    direction,
    checkTile,
    messages,
    setKeyHandler,
  ]);

  return null;
}
