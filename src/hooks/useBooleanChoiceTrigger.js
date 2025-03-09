import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessages,
  setBooleanChoice,
  setShowBooleanBox,
} from "../store/gameSlice";

export default function useBooleanChoiceTrigger(targetX, targetY, targetMap) {
  const dispatch = useDispatch();
  const { tileX, tileY } = useSelector((state) => state.game.player);
  const map = useSelector((state) => state.game.map);
  const booleanChoice = useSelector((state) => state.game.booleanChoice);

  useEffect(() => {
    // ✅ Only trigger if player is in the correct position and map
    if (tileX === targetX && tileY === targetY && map === targetMap) {
      if (booleanChoice === true) {
        dispatch(setMessages(["You chose YES!", "Here’s a reward!"]));
        dispatch(setBooleanChoice(null)); // ✅ Reset choice after triggering event
        dispatch(setShowBooleanBox(false)); // ✅ Hide BooleanBox
      } else if (booleanChoice === false) {
        dispatch(setMessages(["You chose NO!", "Maybe next time..."]));
        dispatch(setBooleanChoice(null));
        dispatch(setShowBooleanBox(false)); // ✅ Hide BooleanBox
      }
    }
  }, [tileX, tileY, map, booleanChoice, dispatch, targetX, targetY, targetMap]);
}
