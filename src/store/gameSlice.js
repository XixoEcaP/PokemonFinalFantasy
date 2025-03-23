import { createSlice } from "@reduxjs/toolkit";
import { OverworldMap1Tiles2 } from "../data/mapChunks";
import pokemons from "../data/pokemonData";
import useCreatePokemon from "../hooks/useCreatePokemon";
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs for Pokémon
const { createPokemon } = useCreatePokemon();

const pokemonList = [
  createPokemon(pokemons.Ifrit, 5),
  createPokemon(pokemons.Ahriman, 5),
  createPokemon(pokemons.Hobgoblin, 5),
  createPokemon(pokemons.Ifurito, 5),
  createPokemon(pokemons.Ahriman, 5),
  createPokemon(pokemons.Bomb, 5),
  createPokemon(pokemons.Leviathan, 5),
  createPokemon(pokemons.Behemoth, 5),
  createPokemon(pokemons.Ramuh, 5),
];
const initialState = {
  gameOver: false,
  battle: false,
  battleVictory: false,
  npcIsWalking: false,
  walkingSteps: 0,
  stepCount: 0,
  walkingDirection: 0,
  items: [
    { item: "Potion", x: 5 },
    { item: "Pokeball", x: 5 },
  ],
  isPaused: false,
  pokemonSelected: false,
  movesMenu: false,
  secondSelect: false,
  talkingNpc: "",
  talkingItem: "",
  animatedNpc: "",
  battleNpc: "",
  starter: "",
  showBooleanBox: false,
  booleanBox: false, // Whether the boolean prompt is visible
  booleanChoice: null, // true = Yes, false = No
  keyHandler: "WorldKeyboardHandler",
  messages: [],
  message: "", // Currently displayed message
  currentMessageIndex: 0,
  otherPkemons: [],
  currentPokemonIndex: 0,
  curreItemIndex: 0,
  next: {
    nextY: 0,
    nextX: 0,
  },
  pokemonTeam: [],
  events: {
    leviaball: false,
    ramball: false,
    ifuritoball: false,
    pokeball1: false,
    trainer1: false,
    trainer2: false,
    trainer3: false,
    trainer4: false,
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
    ovTiles: OverworldMap1Tiles2,
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
      state.next.nextX = nextX;
      state.next.nextY = nextY;
    },
    synchronizePokemonHp(state) {
      state.pokemonTeam.forEach((pokemon) => {
        pokemon.hp = pokemon.stats.hp;
      });
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
      const newPokemon = { ...action.payload }; // Create a new object before modifying
      newPokemon.id = uuidv4(); // Assign a unique ID

      if (state.pokemonTeam.length < 6) {
        state.pokemonTeam.push(newPokemon);
      } else {
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

    setStepCount: (state, action) => {
      state.stepCount = action.payload; // ✅ Toggle pause state
    },
    setMovesMenu: (state, action) => {
      state.movesMenu = action.payload;
    },
    setPokemonSelected: (state, action) => {
      state.pokemonSelected = action.payload;
    },
    setmap: (state, action) => {
      state.map = action.payload;
    },
    setBattleVictory: (state, action) => {
      state.battleVictory = action.payload;
    },
    setCurrentTileSet: (state, action) => {
      state.currentTileSet = action.payload;
    },
    setKeyHandler: (state, action) => {
      state.keyHandler = action.payload;
    },
    setSecondSelect: (state, action) => {
      state.secondSelect = action.payload;
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
    setTalkingItem: (state, action) => {
      state.talkingItem = action.payload; // ✅ Store the NPC being talked to
    },
    setAnimatedNpc: (state, action) => {
      state.animatedNpc = action.payload; // ✅ Store the NPC being talked to
    },
    setBattleNpc: (state, action) => {
      state.battleNpc = action.payload; // ✅ Store the NPC being talked to
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
    setHeal: (state, action) => {
      const { heal } = action.payload;
      state.pokemonTeam[state.currentPokemonIndex].hp += heal;
      if (
        state.pokemonTeam[state.currentPokemonIndex].hp >
        state.pokemonTeam[state.currentPokemonIndex].stats.hp
      )
        state.pokemonTeam[state.currentPokemonIndex].hp =
          state.pokemonTeam[state.currentPokemonIndex].stats.hp; // Prevent negative HP
    },
    setDemage: (state, action) => {
      const { demage } = action.payload;
      state.pokemonTeam[0].hp -= demage;
      if (state.pokemonTeam[0].hp < 0) state.pokemonTeam[0].hp = 0; // Prevent negative HP
    },
    setmovePP: (state, action) => {
      const { moveIndex, newPP } = action.payload;
      // Update PP for the selected move in myTeam[0]
      state.pokemonTeam[0].currentMoves[moveIndex].pp = newPP;
    },
    swapPokemonIndex: (state, action) => {
      const { firstIndex, secondIndex } = action.payload;
      const team = state.pokemonTeam;

      // ✅ Validate indices
      if (
        firstIndex >= 0 &&
        secondIndex >= 0 &&
        firstIndex < team.length &&
        secondIndex < team.length &&
        firstIndex !== secondIndex
      ) {
        const temp = team[firstIndex];
        team[firstIndex] = team[secondIndex];
        team[secondIndex] = temp;
      }
    },
    setExp: (state, action) => {
      state.pokemonTeam[0].exp += action.payload;
    },
    setCurrentPokemonIndex: (state, action) => {
      state.currentPokemonIndex = action.payload;
    },
    setCurrentItemIndex: (state, action) => {
      state.curreItemIndex = action.payload;
    },

    swapCurrentPokemon: (state) => {
      const { currentPokemonIndex, pokemonTeam } = state;

      // Ensure there's something to swap and avoid swapping index 0 with itself
      if (currentPokemonIndex > 0 && currentPokemonIndex < pokemonTeam.length) {
        [pokemonTeam[0], pokemonTeam[currentPokemonIndex]] = [
          pokemonTeam[currentPokemonIndex],
          pokemonTeam[0],
        ];
        state.currentPokemonIndex = 0; // Reset selected index after swap
      }
    },
    addItem: (state, action) => {
      const itemName = action.payload;
      const existingItem = state.items.find((entry) => entry.item === itemName);

      if (existingItem) {
        existingItem.x += 1;
      } else {
        state.items.push({ item: itemName, x: 1 });
      }
    },

    useItem: (state, action) => {
      const itemName = action.payload;
      const itemIndex = state.items.findIndex(
        (entry) => entry.item === itemName
      );

      if (itemIndex !== -1) {
        if (state.items[itemIndex].x > 1) {
          state.items[itemIndex].x -= 1;
        } else {
          state.items.splice(itemIndex, 1); // Remove item completely
        }
      }
    },
  },
});
export const {
  setExp,
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
  setStepCount,
  synchronizePokemonHp,
  setDemage,
  setmovePP,
  swapCurrentPokemon,
  setCurrentPokemonIndex,
  setMovesMenu,
  setPokemonSelected,
  setSecondSelect,
  swapPokemonIndex,
  setCurrentItemIndex,
  setHeal,
  addItem,
  useItem,
  setNext,
  setTalkingItem,
  setAnimatedNpc,
  setBattleVictory,
  setBattleNpc,
} = gameSlice.actions;

export default gameSlice.reducer;
