import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import battleBoxSrc from "../../assets/battlebg.png";
import FoeSprite from "./FoeSprite";
import MySprite from "./MySprite";
import MyHp from "./MyHp";
import FoeHp from "./FoeHp";
import {
  setState,
  setRound,
  setDemage,
  swapFoePokemon,
} from "../../store/battleSlice";
import { setBattle, setMessages } from "../../store/gameSlice";
import useCalculateDamage from "../../hooks/useCalculateDamage";
import PokemonBattleMenu from "./PokemonBattleMenu";

const BattleView = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.game.message);
  const gameState = useSelector((state) => state.battle.state);
  const round = useSelector((state) => state.battle.round);
  const myTeam = useSelector((state) => state.battle.myTeam);
  const foeTeam = useSelector((state) => state.battle.foeTeam);
  const myAttackMove = useSelector((state) => state.battle.AttackMove);
  const foeAttackMove = useSelector((state) => state.battle.foeAttackMove);

  const [mySpritePosition, setMySpritePosition] = useState(0);
  const [foeSpritePosition, setFoeSpritePosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [damage, setDamage] = useState(0);

  const mySprite = myTeam[0]?.sprites?.back;
  const foeSprite = foeTeam[0]?.sprites?.front;

  // ✅ Correct hook usage
  const calculateDamage = useCalculateDamage();

  useEffect(() => {
    const myTeamDefeated = myTeam.every((pokemon) => pokemon.hp <= 0);
    const foeTeamDefeated = foeTeam.every((pokemon) => pokemon.hp <= 0);

    if (gameState === "home") return;
    if (myTeamDefeated && message === "") {
      dispatch(setMessages(["You Lost"]));
      dispatch(setBattle(false));
    }
    if (foeTeamDefeated && message === "") {
      dispatch(setMessages(["You Won!"]));

      dispatch(setBattle(false));
    }

    if (myTeam[0].hp <= 0 && message === "") {
      dispatch(setState("pokemonMenu"));
      return;
    }

    if (message === "" && round === "pokemonSwap" && myTeam[0]) {
      dispatch(setRound("2"));

      dispatch(setState("foeAttack"));

      const damageValue = calculateDamage(myTeam[0], foeTeam[0], foeAttackMove);
      dispatch(setDemage({ demage: damageValue, myAttack: false }));
      dispatch(
        setMessages([
          foeTeam[0].name + " used " + foeAttackMove.name,
          "It dealt " + damageValue,
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
        const damageValue = calculateDamage(
          myTeam[0],
          foeTeam[0],
          myAttackMove
        );
        dispatch(setDemage({ demage: damageValue, myAttack: true }));

        dispatch(setState("myAttack"));
        dispatch(
          setMessages([
            myTeam[0].name + " used " + myAttackMove.name,
            "It dealt " + damageValue,
          ])
        );
        dispatch(setRound("1"));

        if (foeTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              myTeam[0].name + " used " + myAttackMove.name,
              "It dealt " + damageValue,
              foeTeam[0].name + " Died",
            ])
          );
          dispatch(setRound("2"));
        }
      } else {
        dispatch(setState("foeAttack"));

        dispatch(setRound("1"));

        const damageValue = calculateDamage(
          foeTeam[0],
          myTeam[0],
          foeAttackMove
        );
        dispatch(setDemage({ demage: damageValue, myAttack: false }));
        dispatch(
          setMessages([
            foeTeam[0].name + " used " + foeAttackMove.name,
            "It dealt " + damageValue,
          ])
        );
        if (myTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              foeTeam[0].name + " used " + foeAttackMove.name,
              "It dealt " + damageValue,
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
        const damageValue = calculateDamage(
          myTeam[0],
          foeTeam[0],
          myAttackMove
        );
        dispatch(setDemage({ demage: damageValue, myAttack: true }));

        if (foeTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              myTeam[0].name + " used " + myAttackMove.name,
              "It dealt " + damageValue,
              foeTeam[0].name + " Died",
            ])
          );
          dispatch(setRound("2"));
        } else {
          dispatch(
            setMessages([
              myTeam[0].name + " used " + myAttackMove.name,
              "It dealt " + damageValue,
            ])
          );
        }
      } else if (gameState === "foeAttack") {
        dispatch(setRound("2"));
        const damageValue = calculateDamage(
          foeTeam[0],
          myTeam[0],
          foeAttackMove
        );
        dispatch(setDemage({ demage: damageValue, myAttack: false }));
        dispatch(
          setMessages([
            foeTeam[0].name + " used " + foeAttackMove.name,
            "It dealt " + damageValue,
          ])
        );

        if (myTeam[0].hp - damageValue <= 0) {
          dispatch(
            setMessages([
              foeTeam[0].name + " used " + foeAttackMove.name,
              "It dealt " + damageValue,
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
      }, 300);
    }

    if (gameState === "foeAttack") {
      setFoeSpritePosition((prevPos) => prevPos + moveAmount);
      setTimeout(() => {
        setFoeSpritePosition((prevPos) => prevPos - moveAmount);
        setIsMoving(false);
        dispatch(setState("battle"));
      }, 300);
    }
  };

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

      <MyHp pokemon={myTeam[0]} move={myAttackMove} damage={damage} />
      <FoeHp pokemon={foeTeam[0]} move={foeAttackMove} />
      {mySprite && <MySprite sprite={mySprite} position={mySpritePosition} />}
      {foeSprite && (
        <FoeSprite sprite={foeSprite} position={foeSpritePosition} />
      )}
    </div>
  );
};

export default BattleView;
