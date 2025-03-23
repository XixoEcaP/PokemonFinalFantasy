import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayerFrame,
  setPokeballFrame,
  setState,
} from "../store/battleSlice";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const runCatchingAnimation = async (dispatch) => {
  // Animate player: 0 → 4
  for (let i = 0; i < 5; i++) {
    dispatch(setPlayerFrame(i));
    await delay(100);
  }

  // Animate Pokéball forward: 0 → 7
  for (let i = 0; i <= 7; i++) {
    dispatch(setPokeballFrame(i));
    await delay(100);
  }

  // Animate Pokéball backward: 7 → 0
  for (let i = 7; i >= 0; i--) {
    dispatch(setPokeballFrame(i));
    await delay(100);
  }

  // All done
  dispatch(setState("intro"));
};

const useCatchingAnimation = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.battle.state);

  useEffect(() => {
    if (gameState === "catching") {
      runCatchingAnimation(dispatch);
    }
  }, [gameState, dispatch]);
};

export default useCatchingAnimation;
