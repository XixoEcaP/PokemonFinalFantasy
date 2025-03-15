import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setMessages,
  setOvmap,
  setPlayerTile,
  setmap,
  addPokemon,
  setEvent,
  setShowBooleanBox,
  setBooleanChoice,
  setTalkingNpc,
  setPlayerWalking,
  movePlayer,
  setFaster,
  setKeyHandler,
  setNpcIsWalking,
  setOvmapTiles,
  updatePokemon,
  setWalkingDirection,
  setBattle,
  setWalkingSteps,
} from "../store/gameSlice";
import {
  CidLabTiles,
  OverworldMap1Tiles,
  OverworldMap1Tiles2,
} from "../data/mapChunks";
import { Cid, Auron } from "../data/characters";
import { leviaball, ramball, ifuritoball, pokeball1 } from "../data/items";
import pokemons from "../data/pokemonData";
import useCreatePokemon from "../hooks/useCreatePokemon";
import useLevelUp from "../hooks/useLevelUp";
import { setFoeTeam, setMyTeam } from "../store/battleSlice";

export default function useCidLabTileManager() {
  const dispatch = useDispatch();
  const [overworldMap1Tiles, setOverWorldMap1Tiles] =
    useState(OverworldMap1Tiles);
  const { tileX, tileY, direction } = useSelector((state) => state.game.player);
  const tiles = useSelector((state) => state.game.ovmap.tiles);
  const map = useSelector((state) => state.game.map);
  const events = useSelector((state) => state.game.events);
  const npcIsWalking = useSelector((state) => state.game.npcIsWalking);
  const message = useSelector((state) => state.game.message);
  const { createPokemon } = useCreatePokemon();
  const { levelUp } = useLevelUp();
  const pokemonTeam = useSelector((state) => state.game.pokemonTeam);
  const talkingNpc = useSelector((state) => state.game.talkingNpc);
  const battle = useSelector((state) => state.game.battle);
  const booleanChoice = useSelector((state) => state.game.booleanChoice);

  useEffect(() => {
    if (map === "cidlab" && !battle) {
      if (message === "" && events.leviaball && talkingNpc === "Cloud") {
        dispatch(setMyTeam(pokemonTeam));
        const foeTeam = createPokemon(pokemons.Ram, 5);
        dispatch(setFoeTeam([foeTeam]));
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
        dispatch(setWalkingDirection(1));

        dispatch(setEvent("ramball"));
      }
      if (message === "Battling Cloud") {
        dispatch(setNpcIsWalking(false));
        dispatch(setWalkingDirection(1));
        dispatch(setOvmapTiles(CidLabTiles));
        dispatch(setBattle(true));
        dispatch(setTalkingNpc(""));
      }

      if (booleanChoice === true) {
        if (talkingNpc === "Cid") {
          dispatch(setMessages(["HOLA"]));
        }

        if (talkingNpc === "leviaball") {
          const newLevia = createPokemon(pokemons.Levia, 5);
          dispatch(addPokemon(newLevia));
          dispatch(setMessages(["You chose levia"]));
          dispatch(setEvent("leviaball"));
          dispatch(setTalkingNpc("Cloud"));
        }
        if (talkingNpc === "ramball") {
          dispatch(setEvent("ramball"));
          const newRam = createPokemon(pokemons.Ram, 5);
          dispatch(addPokemon(newRam));
          dispatch(setMessages(["You chose ram"]));
        }
        if (talkingNpc === "ifuritoball") {
          dispatch(setEvent("ifuritoball"));
          const newIfurito = createPokemon(pokemons.Ifurito, 5);
          dispatch(addPokemon(newIfurito));
          dispatch(setMessages(["You chose ifurito"]));
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
  ]);
}
