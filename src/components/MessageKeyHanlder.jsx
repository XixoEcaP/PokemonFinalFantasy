import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMessage, setMessages } from "../store/gameSlice";
import {
  setState,
  setRound,
  updatePokemonInBattle,
} from "../store/battleSlice";
import useLevelUp from "../hooks/useLevelUp";

export default function useMessageKeyHandler() {
  const dispatch = useDispatch();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const message = useSelector((state) => state.game.message);
  const messages = useSelector((state) => state.game.messages);

  const gameState = useSelector((state) => state.battle.state); // Get state from the store
  const round = useSelector((state) => state.battle.round);
  const myTeam = useSelector((state) => state.battle.myTeam);
  const foeTeam = useSelector((state) => state.battle.foeTeam);
  const walkingSteps = useSelector((state) => state.game.walkingSteps);
  const stepCount = useSelector((state) => state.game.stepCount);
  const { levelUp } = useLevelUp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (walkingSteps > stepCount) {
        return;
      }

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
        if (message === "Exp Gained") {
          if (myTeam[0].exp >= myTeam[0].maxExp) {
            const oldPokmeon = myTeam[0];

            const newPokemon = levelUp(oldPokmeon);
            dispatch(
              updatePokemonInBattle({
                id: oldPokmeon.id,
                updatedPokemon: newPokemon,
              })
            );
            dispatch(setMessages(["Level Ganied"]));
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    dispatch,
    keyHandler,
    round,
    gameState,
    message,
    messages,
    stepCount,
    walkingSteps,
    foeTeam,
  ]);

  return null;
}
