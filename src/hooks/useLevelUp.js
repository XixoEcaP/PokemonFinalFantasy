import { useDispatch } from "react-redux";
import { updatePokemon } from "../store/gameSlice"; // Action to update the specific Pokémon

const useLevelUp = () => {
  const dispatch = useDispatch();

  const calculateStats = (baseStat, level, isHP = false) => {
    if (isHP) {
      return Math.floor((baseStat * 2 * level) / 100 + level + 10); // For HP
    }
    return Math.floor((baseStat * 2 * level) / 100 + 5); // For other stats
  };

  const levelUp = (pokemon) => {
    if (!pokemon) return; // Ensure we have a valid Pokémon

    const { level } = pokemon; // Get current level of the Pokémon
    const updatedStats = {
      hp: calculateStats(pokemon.stats.hp, level, true),
      attack: calculateStats(pokemon.stats.attack, level),
      defense: calculateStats(pokemon.stats.defense, level),
      specialAttack: calculateStats(pokemon.stats.specialAttack, level),
      specialDefense: calculateStats(pokemon.stats.specialDefense, level),
      speed: calculateStats(pokemon.stats.speed, level),
    };

    const updatedPokemon = {
      ...pokemon,
      stats: updatedStats,
      level: level + 1, // Increment the level
    };

    return updatedPokemon;
  };

  return { levelUp };
};

export default useLevelUp;
