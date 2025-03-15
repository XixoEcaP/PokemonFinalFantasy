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

export default function useCheckTile() {
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

  const messages = useSelector((state) => state.game.messages);

  const booleanChoice = useSelector((state) => state.game.booleanChoice);
  const [NextX, setNextX] = useState("0");
  const [NextY, setNextY] = useState("0");

  const checkTile = () => {
    let nextX = tileX;
    let nextY = tileY;

    switch (direction) {
      case 0:
        nextY += 1;
        break; // Down
      case 1:
        nextX -= 1;
        break; // Left
      case 2:
        nextX += 1;
        break; // Right
      case 3:
        nextY -= 1;
        break; // Up
      default:
        break;
    }

    if (
      tiles &&
      nextY >= 0 &&
      nextY < tiles.length &&
      nextX >= 0 &&
      nextX < tiles[0].length
    ) {
      setNextX(nextX);
      setNextY(nextY);
      const nextTile = tiles[nextY][nextX];
      console.log("Player stepping on:", nextX, nextY, nextTile);

      if (nextX === 18 && nextY === 79 && map === "map3") {
        dispatch(setFaster(true));
        dispatch(setPlayerWalking(true));
        const dx = 0;
        const dy = -1;
        dispatch(movePlayer({ dx, dy }));
        dispatch(setKeyHandler(""));
        setTimeout(() => {
          dispatch(
            setOvmap({
              ovmap: "cidlab",
              width: 16,
              height: 24,
              tileSize: 32,
              tiles: CidLabTiles,
            })
          );
          dispatch(setKeyHandler("WorldKeyboardHandler"));
          dispatch(setPlayerTile({ tileX: 7, tileY: 21 }));
          dispatch(setmap("cidlab"));
        }, 700); // ✅ Short delay for animation
      }
      if (nextX === 7 && nextY === 22 && map === "cidlab") {
        dispatch(setFaster(true));
        dispatch(setPlayerWalking(true));
        dispatch(setKeyHandler(""));
        setTimeout(() => {
          dispatch(
            setOvmap({
              ovmap: "overworldmap1",
              width: 32,
              height: 96,
              tileSize: 32,
              tiles: OverworldMap1Tiles2,
            })
          );
          dispatch(setmap("map3"));

          dispatch(setKeyHandler("WorldKeyboardHandler"));
          dispatch(setPlayerTile({ tileX: 18, tileY: 80 }));
        }, 700); // ✅ Short delay for animation
      }

      // ✅ Update Map Tileset (Auron Event)
      if (
        nextX === Auron.tileX &&
        nextY === Auron.tileY &&
        map === "map3" &&
        !events.leviaball &&
        !events.ramball &&
        !events.ifuritoball
      ) {
        dispatch(
          setMessages(["HEY", "FINAL FANTASY", "I'm Auron", "Go get a pokemon"])
        );

        dispatch(setTalkingNpc("Auron"));
      }

      // ✅ NPC Event: Cid's Boolean Choice
      if (nextX === Cid.tileX && nextY === Cid.tileY && map === "cidlab") {
        if (booleanChoice === null) {
          const oldPokmeon = pokemonTeam[0];

          const newPokemon = levelUp(oldPokmeon);
          console.log(newPokemon);
          dispatch(
            updatePokemon({ id: oldPokmeon.id, updatedPokemon: newPokemon })
          );
          dispatch(setShowBooleanBox(true));
          dispatch(setMessages(["Hi", "Are You Good?", "Yes or No?"]));
          dispatch(setTalkingNpc("Cid"));
        }
      }

      // ✅ Pokémon Event: Collect Levia
      if (
        nextX === leviaball.tileX &&
        nextY === leviaball.tileY &&
        map === "cidlab" &&
        !events.leviaball &&
        !events.ramball &&
        !events.ifuritoball
      ) {
        dispatch(setTalkingNpc("leviaball"));

        dispatch(setShowBooleanBox(true));
        dispatch(setMessages(["Here is the Pokémon Levia!"]));
      }

      // ✅ Pokémon Event: Collect Ram
      if (
        nextX === ramball.tileX &&
        nextY === ramball.tileY &&
        map === "cidlab" &&
        !events.leviaball &&
        !events.ramball &&
        !events.ifuritoball
      ) {
        dispatch(setShowBooleanBox(true));
        dispatch(setMessages(["Here is the Pokémon Ram!"]));
      }
      if (
        nextX === pokeball1.tileX &&
        nextY === pokeball1.tileY &&
        map === "map3" &&
        !events.pokeball1
      ) {
        dispatch(setEvent("pokeball1"));
        dispatch(setOvmapTiles(OverworldMap1Tiles2));
      }
      // ✅ Pokémon Event: Collect Ifurito
      if (
        nextX === ifuritoball.tileX &&
        nextY === ifuritoball.tileY &&
        map === "cidlab" &&
        !events.leviaball &&
        !events.ramball &&
        !events.ifuritoball
      ) {
        dispatch(setShowBooleanBox(true));
        dispatch(setMessages(["Here is the Pokémon Ifurito!"]));
      }
    }
  };

  // ✅ Listen for Boolean Choice & Trigger Events
  // In the useEffect hook

  return checkTile;
}
