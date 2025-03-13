import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMessage, setMessages } from "../store/gameSlice";
import { setState, setRound } from "../store/battleSlice";

export default function useMessageKeyHandler() {
  const dispatch = useDispatch();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const message = useSelector((state) => state.game.message);
  const messages = useSelector((state) => state.game.messages);

  const gameState = useSelector((state) => state.battle.state); // Get state from the store
  const round = useSelector((state) => state.battle.round);
  const myTeam = useSelector((state) => state.battle.myTeam);
  const foeTeam = useSelector((state) => state.battle.foeTeam);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        keyHandler === "MessageKeyboardHandler" &&
        e.key.toLowerCase() === "x"
      ) {
        dispatch(nextMessage());
        if (
          gameState === "battle" &&
          round === "1" &&
          (message === messages[messages.length - 1] || message === "")
        ) {
          if (myTeam[0]?.stats?.speed >= foeTeam[0]?.stats?.speed) {
            dispatch(setState("foeAttack"));
          } else {
            dispatch(setState("myAttack"));
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, keyHandler, round, gameState, message, messages]);

  return null;
}
