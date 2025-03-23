import { createSlice, current } from "@reduxjs/toolkit";
import pokemons from "../data/pokemonData";
import useCreatePokemon from "../hooks/useCreatePokemon";
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
  swapped: false,
  state: "intro",
  playerFrame: 0,
  pokeballFrame: 0,
  moveFrame: 0,
  foeTeam: [pokemonList[2], pokemonList[1], pokemonList[7], pokemonList[8]],
  AttackMove: pokemonList[2].currentMoves[0],
  foeAttackMove: pokemonList[2].currentMoves[0],
  round: "0",
  demage: "0",
  runable: true,
};

const gameSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.state = action.payload;
    },
    setIsIntro: (state, action) => {
      state.isIntro = action.payload;
    },
    setSwapped: (state, action) => {
      state.swapped = action.payload;
    },
    swapFoePokemon: (state) => {
      state.swapped = true;
      const { foeTeam } = state;

      // Find the next Pokémon with hp > 0
      const nextPokemonIndex = foeTeam.findIndex(
        (pokemon, index) => index > 0 && pokemon.hp > 0
      );

      if (nextPokemonIndex !== -1) {
        // Swap to put the next Pokémon first
        [foeTeam[0], foeTeam[nextPokemonIndex]] = [
          foeTeam[nextPokemonIndex],
          foeTeam[0],
        ];
      }
    },
    setFoeAttackMove: (state, action) => {
      state.foeAttackMove = action.payload;
    },

    setFoeDemage: (state, action) => {
      const { demage } = action.payload;
      state.demage = demage;

      state.foeTeam[0].hp -= demage;
      if (state.foeTeam[0].hp < 0) state.foeTeam[0].hp = 0; // Prevent negative HP
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },

    setAttackMove: (state, action) => {
      state.AttackMove = action.payload;
    },

    setFoeTeam: (state, action) => {
      state.foeTeam = action.payload;
    },
    setPlayerFrame: (state, action) => {
      state.playerFrame = action.payload;
    },
    setPokeballFrame: (state, action) => {
      state.pokeballFrame = action.payload;
    },
    setMoveFrame: (state, action) => {
      state.moveFrame = action.payload;
    },
    setRunable: (state, action) => {
      state.runable = action.payload;
    },
  },
});

export const {
  setFoeTeam,
  setState,
  setAttackMove,
  setRound,
  setFoeAttackMove,
  setFoeDemage,
  setCurrentPokemonIndex,
  swapFoePokemon,
  setSwapped,
  setPlayerFrame,
  setPokeballFrame,
  setMoveFrame,
  setRunable,
} = gameSlice.actions;

export default gameSlice.reducer;
