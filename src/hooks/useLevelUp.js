import { useDispatch } from "react-redux";
import { updatePokemon } from "../store/gameSlice"; // Action to update the specific Pokémon
import { getPokemonMaxExp } from "./usePokemonMaxExp"; // Function to get maxExp
import pokemonData from "../data/pokemonData"; // Import full Pokémon species data

const useLevelUp = () => {
  const dispatch = useDispatch();

  // Function to find the Pokémon species data
  const getSpeciesData = (species) => {
    return pokemonData[species] || null; // Access using bracket notation instead of find()
  };

  // Calculate stats based on species' base stats and level
  const calculateStats = (baseStat, level, isHP = false) => {
    if (isHP) {
      return Math.floor((baseStat * 2 * level) / 100 + level + 10); // HP formula
    }
    return Math.floor((baseStat * 2 * level) / 100 + 5);
  };

  const levelUp = (pokemon) => {
    if (!pokemon) return null; // Ensure we have a valid Pokémon

    const speciesData = getSpeciesData(pokemon.specie);
    if (!speciesData) {
      console.error("Species not found:", pokemon.specie);
      return null; // Return early if species data isn't found
    }

    const newLevel = pokemon.level + 1; // Increment level
    const updatedStats = {
      hp: calculateStats(speciesData.hp, newLevel, true),
      attack: calculateStats(speciesData.attack, newLevel),
      defense: calculateStats(speciesData.defense, newLevel),
      specialAttack: calculateStats(speciesData.specialAttack, newLevel),
      specialDefense: calculateStats(speciesData.specialDefense, newLevel),
      speed: calculateStats(speciesData.speed, newLevel),
    };

    const updatedPokemon = {
      ...pokemon,
      stats: updatedStats,
      level: newLevel,
      maxExp: getPokemonMaxExp(newLevel), // Update maxExp for new level
      exp: pokemon.exp - pokemon.maxExp || 0,
    };

    dispatch(updatePokemon({ id: pokemon.id, updatedPokemon })); // Dispatch update

    return updatedPokemon;
  };

  return { levelUp };
};

export default useLevelUp;
