import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveTalkingNpc } from "../store/gameSlice";

export default function useNpcWalking({ character, direction, steps = 5 }) {
  const dispatch = useDispatch();
  const talkingNpc = useSelector((state) => state.game.talkingNpc);

  // Direction to dx, dy mapping
  const getMovement = (direction) => {
    switch (direction) {
      case 0:
        return { dx: 0, dy: 1 }; // Down
      case 1:
        return { dx: -1, dy: 0 }; // Left
      case 2:
        return { dx: 1, dy: 0 }; // Right
      case 3:
        return { dx: 0, dy: -1 }; // Up
      default:
        return { dx: 0, dy: 0 }; // Default case if direction is invalid
    }
  };

  useEffect(() => {
    if (!talkingNpc || talkingNpc.character !== character) return;

    const { dx, dy } = getMovement(direction);

    let stepCount = 0;
    const interval = setInterval(() => {
      if (stepCount >= steps) {
        clearInterval(interval); // Stop after the specified number of steps
        return;
      }

      // Move the NPC in the calculated direction (dx, dy)
      dispatch(moveTalkingNpc({ character, dx, dy }));
      stepCount++;
    }, 200); // Move every 200ms

    return () => clearInterval(interval); // Cleanup the interval
  }, [talkingNpc, character, direction, steps, dispatch]);

  return;
}
