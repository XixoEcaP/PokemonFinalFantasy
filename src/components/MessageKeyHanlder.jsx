import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextMessage,
  setBattle,
  setMessages,
  setNext,
  setTalkingNpc,
  updatePokemon,
} from "../store/gameSlice";
import { setState, setRound, setFoeTeam } from "../store/battleSlice";
import useLevelUp from "../hooks/useLevelUp";

export default function useMessageKeyHandler() {
  const dispatch = useDispatch();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const message = useSelector((state) => state.game.message);
  const messages = useSelector((state) => state.game.messages);

  const gameState = useSelector((state) => state.battle.state); // Get state from the store
  const round = useSelector((state) => state.battle.round);
  const myTeam = useSelector((state) => state.game.pokemonTeam);
  const foeTeam = useSelector((state) => state.battle.foeTeam);
  const walkingSteps = useSelector((state) => state.game.walkingSteps);
  const stepCount = useSelector((state) => state.game.stepCount);
  const { levelUp } = useLevelUp();
  const battle = useSelector((state) => state.game.battle);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (message === "") {
        dispatch(setNext({ nextX: 0, nextY: 0 }));
        dispatch(setTalkingNpc(""));
      }
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
            console.log(myTeam[0]?.stats?.speed, foeTeam[0]?.stats?.speed);

            dispatch(setState("foeAttack"));
          } else {
            dispatch(setState("myAttack"));
            console.log(myTeam[0]?.stats?.speed, foeTeam[0]?.stats?.speed);
          }
        }
        if (
          gameState === "intro" &&
          (message === messages[messages.length - 1] || message === "") &&
          battle
        ) {
          dispatch(setMessages(["I Choose You " + myTeam[0].name]));
          dispatch(setState("introAnimation"));
        }
        if (
          gameState === "caught" &&
          (message === messages[messages.length - 1] || message === "") &&
          battle
        ) {
          dispatch(setFoeTeam([]));
          dispatch(setBattle(false));
          dispatch(setState("intro"));
        }

        if (message === "Exp Gained") {
          if (myTeam[0].exp >= myTeam[0].maxExp) {
            const oldPokmeon = myTeam[0];

            const newPokemon = levelUp(oldPokmeon);
            console.log(newPokemon, oldPokmeon);
            dispatch(
              updatePokemon({
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
    levelUp,
    myTeam,
    battle,
  ]);

  return null;
}
