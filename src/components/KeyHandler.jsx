import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  movePlayer,
  setPlayerDirection,
  setPlayerWalking,
  setFaster,
  setPause,
  setKeyHandler,
} from "../store/gameSlice";
import useCheckTile from "./useCheckTile";

export default function useWorldKeyHandler() {
  const dispatch = useDispatch();
  const { tileX, tileY, direction, faster } = useSelector(
    (state) => state.game.player
  );
  const tiles = useSelector((state) => state.game.ovmap.tiles);
  const checkTile = useCheckTile();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const isPaused = useSelector((state) => state.game.isPaused);
  const throttleTime = faster ? 50 : 300;
  const movementIntervalRef = useRef(null);
  const currentKeyActive = useRef(false);
  const walkTimeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        dispatch(setPause(true));
        dispatch(setKeyHandler("PauseKeyHandler"));
        return;
      }

      if (keyHandler !== "WorldKeyboardHandler") return;

      if (e.key.toLowerCase() === "z") {
        dispatch(setFaster(true));
        dispatch(setPlayerWalking(true));
        return;
      }

      if (e.key.toLowerCase() === "x") {
        checkTile();
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

      if (direction === newDirection) {
        dispatch(setPlayerWalking(true));

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
        dispatch(setPlayerDirection(newDirection));
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
  ]);

  return null;
}
