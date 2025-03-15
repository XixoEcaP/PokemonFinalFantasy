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
  state: "home",
  myTeam: [
    pokemonList[0],
    pokemonList[3],
    pokemonList[4],
    pokemonList[5],
    pokemonList[6],
  ], // Ensure myTeam has at least one Pokémon
  foeTeam: [pokemonList[2], pokemonList[1], pokemonList[7], pokemonList[8]],
  AttackMove: pokemonList[2].currentMoves[0],
  foeAttackMove: pokemonList[2].currentMoves[0],
  round: "0",
  demage: "0",
  currentPokemonIndex: 0,
};

const gameSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.state = action.payload;
    },
    swapCurrentPokemon: (state) => {
      const { currentPokemonIndex, myTeam } = state;

      // Ensure there's something to swap and avoid swapping index 0 with itself
      if (currentPokemonIndex > 0 && currentPokemonIndex < myTeam.length) {
        [myTeam[0], myTeam[currentPokemonIndex]] = [
          myTeam[currentPokemonIndex],
          myTeam[0],
        ];
        state.currentPokemonIndex = 0; // Reset selected index after swap
      }
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
    setCurrentPokemonIndex: (state, action) => {
      state.currentPokemonIndex = action.payload;
    },

    setDemage: (state, action) => {
      const { demage, myAttack } = action.payload;
      state.demage = demage;

      if (myAttack) {
        state.foeTeam[0].hp -= demage;
        console.log("babe");
        if (state.foeTeam[0].hp < 0) state.foeTeam[0].hp = 0; // Prevent negative HP
      } else {
        state.myTeam[0].hp -= demage;
        if (state.myTeam[0].hp < 0) state.myTeam[0].hp = 0; // Prevent negative HP
      }
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },
    setmovePP: (state, action) => {
      const { moveIndex, newPP } = action.payload;
      // Update PP for the selected move in myTeam[0]
      state.myTeam[0].currentMoves[moveIndex].pp = newPP;
    },
    setAttackMove: (state, action) => {
      state.AttackMove = action.payload;
    },
    setMyTeam: (state, action) => {
      state.myTeam = action.payload;
    },
    setFoeTeam: (state, action) => {
      state.foeTeam = action.payload;
    },
  },
});

export const {
  setMyTeam,
  setFoeTeam,
  setState,
  setAttackMove,
  setmovePP,
  setRound,
  setFoeAttackMove,
  setDemage,
  setCurrentPokemonIndex,
  swapCurrentPokemon,
  swapFoePokemon,
  setSwapped,
} = gameSlice.actions;

export default gameSlice.reducer;
