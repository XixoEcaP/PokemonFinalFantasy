import { createSlice } from "@reduxjs/toolkit";
import pokemons from "../data/pokemonData";
import useCreatePokemon from "../hooks/useCreatePokemon";
const { createPokemon } = useCreatePokemon();

const pokemonList = [
  createPokemon(pokemons.Levia, 5),
  createPokemon(pokemons.Ifurito, 5),
  createPokemon(pokemons.Ram, 5),
];

const initialState = {
  state: "home",
  myTeam: pokemonList.length > 0 ? [pokemonList[0]] : [], // Ensure myTeam has at least one Pokémon
  foeTeam: [pokemonList[2], pokemonList[1]],
  myHP: pokemonList[0]?.stats?.hp || 0, // Safely handle undefined
  foeHp: pokemonList[0]?.stats?.hp || 0, // Safely handle undefined
  AttackMove: null,
};

const gameSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.state = action.payload;
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

export const { setMyTeam, setFoeTeam, setState, setAttackMove, setmovePP } =
  gameSlice.actions;

export default gameSlice.reducer;
