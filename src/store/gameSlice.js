import { createSlice } from "@reduxjs/toolkit";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
import pokemons from "../data/pokemonData";
import useCreatePokemon from "../hooks/useCreatePokemon";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs for Pokémon

const initialState = {
  gameOver: false,
  battle: false,
  npcIsWalking: false,
  walkingSteps: 1,
  walkingDirection: 0,
  items: ["Potion", "Pokeball"],
  isPaused: false,
  talkingNpc: "",
  starter: "",
  showBooleanBox: false,
  booleanBox: false, // Whether the boolean prompt is visible
  booleanChoice: null, // true = Yes, false = No
  keyHandler: "WorldKeyboardHandler",
  messages: [],
  message: "", // Currently displayed message
  currentMessageIndex: 0,
  otherPkemons: [],
  pokemonTeam: [],
  next: {
    nextY: 0,
    nextX: 0,
  },
  events: {
    leviaball: false,
    ramball: false,
    ifuritoball: false,
    pokeball1: false,
  },
  player: {
    tileX: 11,
    tileY: 92,
    direction: 0, // 0=down, 1=left, 2=right, 3=up
    isWalking: false,
    faster: false,
  },
  ovmap: {
    ovmap: "overworldmap1",
    width: 32,
    height: 96,
    tileSize: 32,
    tiles: OverworldMap1Tiles2,
  },
  map: "map3",
  currentTileSet: 1,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload; // ✅ Toggle pause state
    },
    setNext: (state, action) => {
      const { nextX, nextY } = action.payload;
      state.next.nextX = tileX;
      state.next.nextY = tileY;
    },
    setBattle: (state, action) => {
      state.battle = action.payload; // ✅ Toggle pause state
    },
    setPause: (state, action) => {
      state.isPaused = action.payload; // ✅ Toggle pause state
    },
    setPokemonTeam: (state, action) => {
      state.pokemonTeam = action.payload;
    },
    setWalkingDirection: (state, action) => {
      state.walkingDirection = action.payload;
    },
    addPokemon: (state, action) => {
      const newPokemon = action.payload;

      // Assign a unique ID to each Pokémon
      newPokemon.id = uuidv4(); // Generate a unique ID for each Pokémon

      // If the team has fewer than 6 Pokémon, add it to the team
      if (state.pokemonTeam.length < 6) {
        state.pokemonTeam.push(newPokemon);
      } else {
        // Otherwise, add it to otherPokemons
        state.otherPkemons.push(newPokemon);
      }
    },

    // Update an existing Pokémon in the team based on the ID
    updatePokemon: (state, action) => {
      const { id, updatedPokemon } = action.payload;

      // Update Pokémon in the team immutably
      state.pokemonTeam = state.pokemonTeam.map((pokemon) =>
        pokemon.id === id ? { ...updatedPokemon } : pokemon
      );

      // Update Pokémon in the otherPokemons list immutably
      state.otherPkemons = state.otherPkemons.map((pokemon) =>
        pokemon.id === id ? { ...updatedPokemon } : pokemon
      );
    },

    // Remove a Pokémon from the team or the otherPokemons list
    removePokemon: (state, action) => {
      const id = action.payload;

      // Remove the Pokémon from the team
      state.pokemonTeam = state.pokemonTeam.filter(
        (pokemon) => pokemon.id !== id
      );

      // Remove the Pokémon from the otherPokemons list
      state.otherPkemons = state.otherPkemons.filter(
        (pokemon) => pokemon.id !== id
      );
    },
    setPlayerDirection: (state, action) => {
      if (state.battle === false) {
        state.player.direction = action.payload;
      }
    },
    setPlayerWalking: (state, action) => {
      state.player.isWalking = action.payload;
    },
    setWalkingSteps: (state, action) => {
      state.walkingSteps = action.payload;
    },
    setmap: (state, action) => {
      state.map = action.payload;
    },
    setCurrentTileSet: (state, action) => {
      state.currentTileSet = action.payload;
    },
    setKeyHandler: (state, action) => {
      state.keyHandler = action.payload;
    },
    setStarter: (state, action) => {
      state.starter = action.payload;
    },
    setEvent: (state, action) => {
      state.events[action.payload] = true;
    },
    setShowBooleanBox: (state, action) => {
      state.showBooleanBox = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },

    setPlayerTile: (state, action) => {
      if (state.battle === false) {
        const { tileX, tileY } = action.payload;
        if (
          tileX >= 0 &&
          tileX < state.ovmap.width &&
          tileY >= 0 &&
          tileY < state.ovmap.height
        ) {
          state.player.tileX = tileX;
          state.player.tileY = tileY;
        }
      }
    },
    movePlayer: (state, action) => {
      if (state.battle === false) {
        const { dx, dy } = action.payload;
        const newX = state.player.tileX + dx;
        const newY = state.player.tileY + dy;
        if (
          newX >= 0 &&
          newX < state.ovmap.width &&
          newY >= 0 &&
          newY < state.ovmap.height
        ) {
          state.player.tileX = newX;
          state.player.tileY = newY;
        }
      }
    },
    setFaster: (state, action) => {
      state.player.faster = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentMessageIndex = action.payload;
    },
    setOvmap: (state, action) => {
      state.ovmap = { ...state.ovmap, ...action.payload };
    },
    setOvmapTiles: (state, action) => {
      state.ovmap.tiles = action.payload; // Update the tiles in the ovmap
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
      state.message = action.payload.length > 0 ? action.payload[0] : "";
      state.currentMessageIndex = 0;
      state.keyHandler = "MessageKeyboardHandler";

      // ✅ Activate BooleanBox IMMEDIATELY if only 1 message
      if (action.payload.length === 1 && state.showBooleanBox) {
        state.showBooleanBox = false;
        state.booleanBox = true;
        state.keyHandler = "BooleanKeyboardHandler";
      } else {
        state.booleanBox = false;
      }
    },
    nextMessage: (state) => {
      if (state.currentMessageIndex < state.messages.length - 1) {
        state.currentMessageIndex += 1;
        state.message = state.messages[state.currentMessageIndex];

        // ✅ Activate BooleanBox on last message
        if (
          state.currentMessageIndex === state.messages.length - 1 &&
          state.showBooleanBox
        ) {
          state.showBooleanBox = false;
          state.booleanBox = true;
          state.keyHandler = "BooleanKeyboardHandler";
        }
      } else {
        // ✅ Reset state after last message
        state.currentMessageIndex = 0;
        state.messages = [];
        state.message = "";
        state.booleanBox = false;
        state.keyHandler = "WorldKeyboardHandler";
      }
    },
    setBooleanBox: (state, action) => {
      state.booleanBox = action.payload;
    },
    setBooleanChoice: (state, action) => {
      state.booleanChoice = action.payload;
    },
    confirmBooleanChoice: (state) => {
      state.booleanBox = false;
      state.booleanChoice = null;
      state.keyHandler = "WorldKeyboardHandler";
    },
    setTalkingNpc: (state, action) => {
      state.talkingNpc = action.payload; // ✅ Store the NPC being talked to
    },
    clearTalkingNpc: (state) => {
      state.talkingNpc = null; // ✅ Reset when conversation ends
    },
    setNpcIsWalking: (state, action) => {
      state.npcIsWalking = action.payload; // ✅ Store the NPC being talked to
    },
    moveTalkingNpc: (state, action) => {
      const { character, dx, dy } = action.payload;
      if (state.talkingNpc && state.talkingNpc.character === character) {
        state.npcIsWalking = true;
        state.talkingNpc.tileX += dx;
        state.talkingNpc.tileY += dy;
      }
    },
  },
});
export const {
  setPokemonTeam,
  setPlayerDirection,
  setPlayerWalking,
  setmap,
  setCurrentTileSet,
  setKeyHandler,
  setStarter,
  setEvent,
  setPlayerTile,
  movePlayer,
  setFaster,
  setOvmap,
  setMessages,
  nextMessage,
  setBooleanBox,
  showBooleanBox,
  hideBooleanBox,
  setBooleanChoice,
  confirmBooleanChoice,
  setShowBooleanBox,
  setCurrentIndex,
  setTalkingNpc,
  clearTalkingNpc,
  setPause,
  setNpcIsWalking,
  setItems,
  moveTalkingNpc,
  setOvmapTiles,
  addPokemon,
  updatePokemon,
  setWalkingDirection,
  setBattle,
  setWalkingSteps,
  setGameOver,
} = gameSlice.actions;

export default gameSlice.reducer;
