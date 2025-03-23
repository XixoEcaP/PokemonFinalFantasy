import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import battleBoxSrc from "../../assets/battlebg.png";
import FoeSprite from "./FoeSprite";
import MySprite from "./MySprite";
import MyHp from "./MyHp";
import FoeHp from "./FoeHp";
import playerBack from "../../assets/playerBack.png";
import BagBattleMenu from "./BagBattleMenu";
import MySpecialMove from "./MySpecialMove"; // adjust path if needed

import {
  setState,
  setRound,
  setFoeDemage,
  swapFoePokemon,
  setFoeTeam,
  setIsIntro,
  setPlayerFrame,
  setPokeballFrame,
  setMoveFrame,
  setRunable,
} from "../../store/battleSlice";
import {
  setDemage,
  setBattle,
  setGameOver,
  setMessages,
  setExp,
  updatePokemon,
  setPokemonTeam,
  addPokemon,
  setKeyHandler,
  setBattleVictory,
} from "../../store/gameSlice";
import useCalculateDamage from "../../hooks/useCalculateDamage";
import PokemonBattleMenu from "./PokemonBattleMenu";
import useLevelUp from "../../hooks/useLevelUp";
import Player from "../Player";
import PlayerSprite from "./PlayerSprite";
import CatchingPokeBall from "./CatchingPokeball";
import useCatchingAnimation from "../../hooks/useCathingAnimation";
import FoeSpecialMove from "./FoeSpecialMove";

const BattleView = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.game.message);
  const gameState = useSelector((state) => state.battle.state);
  const round = useSelector((state) => state.battle.round);
  const myTeam = useSelector((state) => state.game.pokemonTeam);
  const foeTeam = useSelector((state) => state.battle.foeTeam);
  const myAttackMove = useSelector((state) => state.battle.AttackMove);
  const foeAttackMove = useSelector((state) => state.battle.foeAttackMove);

  const [mySpritePosition, setMySpritePosition] = useState(0);
  const [foeSpritePosition, setFoeSpritePosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isPokeball, setIsPokeball] = useState(false);
  // const [damage, setDamage] = useState(0);
  const mySprite = myTeam[0]?.sprites?.back;
  const foeSprite = foeTeam[0]?.sprites?.front;

  // ✅ Correct hook usage
  const calculateDamage = useCalculateDamage();

  useEffect(() => {
    const myTeamDefeated = myTeam.every((pokemon) => pokemon.hp <= 0);
    const foeTeamDefeated = foeTeam.every((pokemon) => pokemon.hp <= 0);

    if (gameState === "home") {
      return;
    }

    if (myTeamDefeated && message === "") {
      dispatch(setMessages(["You Lost", "Gameover"]));
      dispatch(setBattle(false));
      dispatch(setGameOver(true));
      dispatch(setState("intro"));
      dispatch(setFoeTeam([]));
      dispatch(setRunable(true));
      return;
    }
    if (foeTeamDefeated && message === "") {
      dispatch(setMessages(["You Won!"]));
      dispatch(setState("intro"));
      dispatch(setBattleVictory(true));
      dispatch(setBattle(false));
      dispatch(setFoeTeam([]));
      dispatch(setRunable(true));

      return;
    }

    if (myTeam[0].hp <= 0 && message === "") {
      dispatch(setState("pokemonMenu"));
      return;
    }

    if (message === "" && round === "pokemonSwap" && myTeam[0]) {
      dispatch(setRound("2"));

      dispatch(setState("foeAttack"));

      const damageObject = calculateDamage(
        foeTeam[0],
        myTeam[0],
        foeAttackMove
      );
      const damageValue = damageObject.damage;
      dispatch(setDemage({ demage: damageValue }));
      dispatch(
        setMessages([
          foeTeam[0].name + " used " + foeAttackMove.name,
          "It dealt " + damageValue + " " + damageObject.effectiveness,
        ])
      );
    }

    if (message === "" && round === "2") {
      dispatch(setState("home"));
      if (foeTeam[0].hp <= 0) {
        dispatch(swapFoePokemon());
      }
    }

    if (gameState === "battle" && message === "" && round === "0") {
      if (myTeam[0]?.stats?.speed >= foeTeam[0]?.stats?.speed) {
        console.log(myTeam[0]?.stats?.speed, foeTeam[0]?.stats?.speed);
        const damageObject = calculateDamage(
          myTeam[0],
          foeTeam[0],
          myAttackMove
        );
        const damageValue = damageObject.damage;
        dispatch(setFoeDemage({ demage: damageValue }));

        dispatch(setState("myAttack"));
        dispatch(
          setMessages([
            myTeam[0].name + " used " + myAttackMove.name,
            "It dealt " + damageValue + " " + damageObject.effectiveness,
          ])
        );
        dispatch(setRound("1"));

        if (foeTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              myTeam[0].name + " used " + myAttackMove.name,
              "It dealt " + damageValue + " " + damageObject.effectiveness,
              foeTeam[0].name + " Died",
              "Exp Gained",
            ])
          );
          dispatch(setRound("2"));
          dispatch(setExp(50));
        }
      } else {
        console.log(myTeam[0]?.stats?.speed, foeTeam[0]?.stats?.speed);

        dispatch(setState("foeAttack"));

        dispatch(setRound("1"));

        const damageObject = calculateDamage(
          foeTeam[0],
          myTeam[0],
          foeAttackMove
        );
        const damageValue = damageObject.damage;

        dispatch(setDemage({ demage: damageValue }));
        dispatch(
          setMessages([
            foeTeam[0].name + " used " + foeAttackMove.name,
            "It dealt " + damageValue + " " + damageObject.effectiveness,
          ])
        );
        if (myTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              foeTeam[0].name + " used " + foeAttackMove.name,
              "It dealt " + damageValue + " " + damageObject.effectiveness,
              myTeam[0].name + " Died",
            ])
          );
        }
      }
    }

    if (gameState === "myAttack" || gameState === "foeAttack") {
      moveSprites();
    }

    if (message === "" && round === "1") {
      if (gameState === "myAttack") {
        dispatch(setRound("2"));
        const damageObject = calculateDamage(
          myTeam[0],
          foeTeam[0],
          myAttackMove
        );
        const damageValue = damageObject.damage;

        dispatch(setFoeDemage({ demage: damageValue }));

        if (foeTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              myTeam[0].name + " used " + myAttackMove.name,
              "It dealt " + damageValue + " " + damageObject.effectiveness,
              foeTeam[0].name + " Died",
              "Exp Gained",
            ])
          );
          dispatch(setExp(200));

          dispatch(setRound("2"));
        } else {
          dispatch(
            setMessages([
              myTeam[0].name + " used " + myAttackMove.name,
              "It dealt " + damageValue + " " + damageObject.effectiveness,
            ])
          );
        }
      } else if (gameState === "foeAttack") {
        dispatch(setRound("2"));
        const damageObject = calculateDamage(
          foeTeam[0],
          myTeam[0],
          foeAttackMove
        );
        const damageValue = damageObject.damage;

        dispatch(setDemage({ demage: damageValue }));
        dispatch(
          setMessages([
            foeTeam[0].name + " used " + foeAttackMove.name,
            "It dealt " + damageValue + " " + damageObject.effectiveness,
          ])
        );

        if (myTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              foeTeam[0].name + " used " + foeAttackMove.name,
              "It dealt " + damageValue + " " + damageObject.effectiveness,
              myTeam[0].name + " Died",
            ])
          );
        }
      }
    }
  }, [
    gameState,
    round,
    message,
    myTeam,
    foeTeam,
    myAttackMove,
    calculateDamage,
  ]);
  useEffect(() => {
    const runCatchingAnimation = async () => {
      // Animate player: 0 → 4
      for (let i = 0; i < 4; i++) {
        dispatch(setPlayerFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }
      setIsPokeball(true);

      dispatch(setPlayerFrame(4));

      await new Promise((res) => setTimeout(res, 200));

      // Animate Pokéball forward: 0 → 7
      for (let i = 0; i <= 7; i++) {
        dispatch(setPokeballFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }

      // Animate Pokéball backward: 7 → 0
      for (let i = 7; i >= 0; i--) {
        dispatch(setPokeballFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }

      // Second cycle forward
      for (let i = 0; i <= 7; i++) {
        dispatch(setPokeballFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }

      // Third cycle backward
      for (let i = 7; i >= 0; i--) {
        dispatch(setPokeballFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }
      for (let i = 0; i <= 7; i++) {
        dispatch(setPokeballFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }

      // Third cycle backward
      for (let i = 7; i >= 0; i--) {
        dispatch(setPokeballFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }

      const random = Math.floor(Math.random() * 100);
      if (random > 60) {
        // Finish
        dispatch(setPlayerFrame(0));
        dispatch(setState("battle"));
        dispatch(setRound("pokemonSwap"));
        dispatch(setPokeballFrame(0));
        dispatch(setMessages(["Pokemon broke Free"]));
        setIsPokeball(false); // Optional reset
      } else {
        dispatch(setPokemonTeam(myTeam));
        dispatch(setPlayerFrame(0));
        dispatch(setPokeballFrame(0));
        dispatch(setMessages(["Added " + foeTeam[0].name]));
        dispatch(addPokemon(foeTeam[0]));
        dispatch(setState("caught"));
      }
    };

    if (gameState === "catching") {
      runCatchingAnimation();
    }
  }, [gameState, dispatch]);

  useEffect(() => {
    const runIntroAnimation = async () => {
      // Animate player: 0 → 4
      for (let i = 0; i < 4; i++) {
        dispatch(setPlayerFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }
      dispatch(setPlayerFrame(4));

      await new Promise((res) => setTimeout(res, 100));

      dispatch(setState("home"));
      dispatch(setPlayerFrame(0));
    };

    if (gameState === "introAnimation") {
      runIntroAnimation();
    }
  }, [gameState, dispatch]);

  const moveSprites = () => {
    if (isMoving) return;
    setIsMoving(true);

    const moveAmount = 48;

    if (gameState === "myAttack") {
      setMySpritePosition((prevPos) => prevPos + moveAmount);
      setTimeout(() => {
        setMySpritePosition((prevPos) => prevPos - moveAmount);
        setIsMoving(false);
        dispatch(setState("battle"));
      }, 200);
    }

    if (gameState === "foeAttack") {
      setFoeSpritePosition((prevPos) => prevPos + moveAmount);
      setTimeout(() => {
        setFoeSpritePosition((prevPos) => prevPos - moveAmount);
        setIsMoving(false);
        dispatch(setState("battle"));
      }, 200);
    }
  };
  useEffect(() => {
    const runMySpecialAnimation = async () => {
      dispatch(setKeyHandler(""));
      // Animate player: 0 → 4
      for (let i = 0; i < 9; i++) {
        dispatch(setMoveFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }

      dispatch(setKeyHandler("MessageKeyboardHandler"));
      dispatch(setMoveFrame(0));
    };

    if (gameState === "myAttack" && myAttackMove.category === "Special") {
      runMySpecialAnimation();
    }
  }, [gameState, dispatch]);
  useEffect(() => {
    const runFoeSpecialAnimation = async () => {
      dispatch(setKeyHandler(""));
      // Animate player: 0 → 4
      for (let i = 0; i < 9; i++) {
        dispatch(setMoveFrame(i));
        await new Promise((res) => setTimeout(res, 100));
      }
      dispatch(setKeyHandler("MessageKeyboardHandler"));
      dispatch(setMoveFrame(0));
    };

    if (gameState === "foeAttack" && foeAttackMove.category === "Special") {
      runFoeSpecialAnimation();
    }
  }, [gameState, dispatch]);

  return (
    <div
      style={{
        width: "512px",
        height: "288px",
        background: `url(${battleBoxSrc}) no-repeat center/contain`,
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {gameState === "pokemonMenu" && <PokemonBattleMenu />}
      {gameState === "bag" && <BagBattleMenu />}
      {gameState === "intro" ||
      gameState === "introAnimation" ||
      gameState === "catching" ||
      gameState === "caught" ? (
        <>
          <CatchingPokeBall isPokeball={isPokeball} />
          <PlayerSprite />
          {foeSprite && (
            <FoeSprite
              sprite={foeSprite}
              position={foeSpritePosition}
              isPokeball={isPokeball}
            />
          )}
        </>
      ) : (
        <>
          <MyHp pokemon={myTeam[0]} move={myAttackMove} />
          <FoeHp pokemon={foeTeam[0] || playerBack} move={foeAttackMove} />
          {mySprite && (
            <MySprite sprite={mySprite} position={mySpritePosition} />
          )}
          {foeSprite && (
            <FoeSprite
              sprite={foeSprite}
              position={foeSpritePosition}
              isPokeball={isPokeball}
            />
          )}
          {gameState === "myAttack" && myAttackMove.category === "Special" && (
            <MySpecialMove />
          )}
          {gameState === "foeAttack" &&
            foeAttackMove.category === "Special" && <FoeSpecialMove />}
        </>
      )}
    </div>
  );
};

export default BattleView;
