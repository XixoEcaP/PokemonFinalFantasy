import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setMessages,
  addPokemon,
  setEvent,
  setBooleanChoice,
  setTalkingNpc,
  setNpcIsWalking,
  setOvmapTiles,
  setWalkingDirection,
  setBattle,
  setWalkingSteps,
  setStepCount,
  setAnimatedNpc,
  setPokemonTeam,
} from "../store/gameSlice";
import {
  CidLabTiles,
  OverworldMap1Tiles,
  OverworldMap1Tiles2,
} from "../data/mapChunks";
import { Cid, Auron, Cloud } from "../data/characters";
import { leviaball, ramball, ifuritoball, pokeball1 } from "../data/items";
import pokemons from "../data/pokemonData";
import useCreatePokemon from "../hooks/useCreatePokemon";
import useLevelUp from "../hooks/useLevelUp";
import { setFoeTeam, setRunable } from "../store/battleSlice";

export default function useCidLabTileManager() {
  const dispatch = useDispatch();
  const [overworldMap1Tiles, setOverWorldMap1Tiles] =
    useState(OverworldMap1Tiles);
  const { tileX, tileY, direction } = useSelector((state) => state.game.player);
  const tiles = useSelector((state) => state.game.ovmap.tiles);
  const map = useSelector((state) => state.game.map);
  const events = useSelector((state) => state.game.events);
  const npcIsWalking = useSelector((state) => state.game.npcIsWalking);
  const walkingSteps = useSelector((state) => state.game.walkingSteps);
  const stepCount = useSelector((state) => state.game.stepCount);
  const message = useSelector((state) => state.game.message);
  const { createPokemon } = useCreatePokemon();
  const { levelUp } = useLevelUp();
  const pokemonTeam = useSelector((state) => state.game.pokemonTeam);
  const talkingNpc = useSelector((state) => state.game.talkingNpc);
  const talkingItem = useSelector((state) => state.game.talkingItem);
  const animatedNpc = useSelector((state) => state.game.animatedNpc);

  const battle = useSelector((state) => state.game.battle);
  const booleanChoice = useSelector((state) => state.game.booleanChoice);

  useEffect(() => {
    dispatch(setWalkingDirection(0));

    if (map === "cidlab" && !battle) {
      if (
        message === "" &&
        (events.leviaball || events.ramball || events.ifuritoball) &&
        animatedNpc === "Cloud"
      ) {
        if (events.leviaball) {
          const foeTeam = createPokemon(pokemons.Ramuh, 5);
          dispatch(setFoeTeam([foeTeam]));
        } else if (events.ramball) {
          const foeTeam = createPokemon(pokemons.Ifrit, 5);
          dispatch(setFoeTeam([foeTeam]));
        } else if (events.ifuritoball) {
          const foeTeam = createPokemon(pokemons.Leviathan, 5);
          dispatch(setFoeTeam([foeTeam]));
        }
        dispatch(setPokemonTeam(pokemonTeam));
        dispatch(setRunable(false));

        dispatch(setNpcIsWalking(false));
        dispatch(
          setMessages([
            "Hey",
            "I'm chosing My Pokemon",
            "Lets Battle",
            "Battling Cloud",
          ])
        );
      }
      if (message === "Hey") {
        dispatch(setWalkingSteps(3));

        dispatch(setNpcIsWalking(true));
      }
      if (message === "I'm chosing My Pokemon") {
        dispatch(setWalkingDirection(1));
      }
      if (message === "Lets Battle") {
        if (events.leviaball) {
          dispatch(setEvent("ramball"));
        } else if (events.ramball) {
          dispatch(setEvent("ifuritoball"));
        } else if (events.ifuritoball) {
          dispatch(setEvent("leviaball"));
        }
      }
      if (message === "Battling Cloud") {
        dispatch(setNpcIsWalking(false));
        dispatch(setWalkingDirection(1));
        dispatch(setWalkingSteps(0));
        dispatch(setStepCount(0));
        dispatch(setOvmapTiles(CidLabTiles));
        dispatch(setBattle(true));
        dispatch(setTalkingNpc(""));
        dispatch(setAnimatedNpc(""));
      }

      if (booleanChoice === true) {
        if (talkingNpc === "Cid") {
          dispatch(setMessages(["HOLA"]));
        }

        if (talkingItem === "leviaball") {
          const newLevia = createPokemon(pokemons.Leviathan, 5);
          dispatch(addPokemon(newLevia));
          dispatch(setMessages(["You choose " + newLevia.specie]));
          dispatch(setEvent("leviaball"));
          dispatch(setAnimatedNpc("Cloud"));
        }
        if (talkingItem === "ramball") {
          const newRam = createPokemon(pokemons.Ramuh, 5);
          dispatch(addPokemon(newRam));
          dispatch(setMessages(["You choose " + newRam.specie]));
          dispatch(setEvent("ramball"));
          dispatch(setAnimatedNpc("Cloud"));
        }
        if (talkingItem === "ifuritoball") {
          const newIfurito = createPokemon(pokemons.Ifrit, 5);
          dispatch(addPokemon(newIfurito));
          dispatch(setMessages(["You choose " + newIfurito.specie]));
          dispatch(setEvent("ifuritoball"));
          dispatch(setAnimatedNpc("Cloud"));
        }

        dispatch(setBooleanChoice(null));
      } else if (booleanChoice === false) {
        dispatch(setBooleanChoice(null));
      }
    }
  }, [
    tileX,
    tileY,
    map,
    booleanChoice,
    dispatch,
    message,
    talkingNpc,
    battle,
    pokemonTeam,
    walkingSteps,
    stepCount,
    createPokemon,
  ]);
}
