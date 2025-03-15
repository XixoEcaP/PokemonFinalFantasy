import useCreatePokemon from "../hooks/useCreatePokemon";
import pokemons from "../data/pokemonData";
import CidLab from "../components/CidLab";

const { createPokemon } = useCreatePokemon();

const pokemonList = [
  createPokemon(pokemons.Malboro, 5),
  createPokemon(pokemons.OneEye, 5),
  createPokemon(pokemons.Goblin, 5),
  createPokemon(pokemons.Ifurito, 5),
  createPokemon(pokemons.Bomb, 5),
  createPokemon(pokemons.Ram, 5),
  createPokemon(pokemons.Bandersnatch, 5),
  createPokemon(pokemons.Hemoth, 5),
  createPokemon(pokemons.Hecteyes, 5),
  createPokemon(pokemons.Coeurl, 5),
];

// pokemonBattles.js

const pokemonBattles = {
  CidLab: [],
  map2: [
    { pokemon: pokemonList[0], chance: 10 },
    { pokemon: pokemonList[1], chance: 10 },
    { pokemon: pokemonList[2], chance: 10 },
    { pokemon: pokemonList[3], chance: 10 },
    { pokemon: pokemonList[4], chance: 10 },
    { pokemon: pokemonList[5], chance: 10 },
    { pokemon: pokemonList[6], chance: 10 },
    { pokemon: pokemonList[7], chance: 10 },
    { pokemon: pokemonList[8], chance: 10 },
    { pokemon: pokemonList[9], chance: 10 },
  ],
  // Add other maps as needed
};

export default pokemonBattles;
