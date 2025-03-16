import { useDispatch } from "react-redux";
import { updatePokemon } from "../store/gameSlice"; // Action to update the specific Pokémon
import { getPokemonMaxExp } from "./usePokemonMaxExp"; // Import function to get maxExp

const useLevelUp = () => {
  const dispatch = useDispatch();

  const calculateStats = (baseStat, level, isHP = false) => {
    if (isHP) {
      return Math.floor((baseStat * 2 * level) / 100 + level + 10); // For HP
    }
    return Math.floor((baseStat * 2 * level) / 100 + 5); // For other stats
  };

  const levelUp = (pokemon) => {
    if (!pokemon) return null; // Ensure we have a valid Pokémon

    const newLevel = pokemon.level + 1; // Increment level
    const updatedStats = {
      hp: calculateStats(pokemon.stats.hp, newLevel, true),
      attack: calculateStats(pokemon.stats.attack, newLevel),
      defense: calculateStats(pokemon.stats.defense, newLevel),
      specialAttack: calculateStats(pokemon.stats.specialAttack, newLevel),
      specialDefense: calculateStats(pokemon.stats.specialDefense, newLevel),
      speed: calculateStats(pokemon.stats.speed, newLevel),
    };

    const updatedPokemon = {
      ...pokemon,
      stats: updatedStats,
      level: newLevel,
      maxExp: getPokemonMaxExp(newLevel), // ✅ Update maxExp for new level
      exp: pokemon.exp - pokemon.maxExp || 0,
    };

    dispatch(updatePokemon({ id: pokemon.id, updatedPokemon })); // ✅ Dispatch update

    return updatedPokemon;
  };

  return { levelUp };
};

export default useLevelUp;
