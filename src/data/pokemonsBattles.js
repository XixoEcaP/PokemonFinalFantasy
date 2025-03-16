import useCreatePokemon from "../hooks/useCreatePokemon";
import pokemons from "../data/pokemonData";
import CidLab from "../components/CidLab";

const { createPokemon } = useCreatePokemon();

const pokemonList = [
  createPokemon(pokemons.GMalboro, 3),
  createPokemon(pokemons.Ahriman, 3),
  createPokemon(pokemons.GiantFlan, 3),
  createPokemon(pokemons.Bomb, 3),
  createPokemon(pokemons.Coeurlregina, 3),
  createPokemon(pokemons.Hecteyes, 3),
  createPokemon(pokemons.Bandersnatch, 3),
  createPokemon(pokemons.Hobgoblin, 3),
  createPokemon(pokemons.Hemoth, 2),
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
    { pokemon: pokemonList[8], chance: 20 },
  ],
  // Add other maps as needed
};

export default pokemonBattles;
