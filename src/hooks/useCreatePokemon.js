import { getPokemonMaxExp } from "./usePokemonMaxExp"; // Import the function
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs for Pokémon

const useCreatePokemon = () => {
  const calculateStats = (baseStat, level, isHP = false) => {
    if (isHP) {
      return Math.floor((baseStat * 2 * level) / 100 + level + 10);
    }
    return Math.floor((baseStat * 2 * level) / 100 + 5);
  };

  const createPokemon = (species, level, name = "") => {
    const pokemon = species;

    const hp = calculateStats(pokemon.hp, level, true);
    const attack = calculateStats(pokemon.attack, level, false);
    const defense = calculateStats(pokemon.defense, level, false);
    const specialAttack = calculateStats(pokemon.specialAttack, level, false);
    const specialDefense = calculateStats(pokemon.specialDefense, level, false);
    const speed = calculateStats(pokemon.speed, level, false);
    const maxExp = getPokemonMaxExp(level); // ✅ Call function, NOT a hook

    return {
      id: null,
      name: name || pokemon.specie,
      specie: pokemon.specie,
      type: pokemon.type,
      sprites: pokemon.sprites,
      evolutions: pokemon.Evolutions,
      currentMoves: [...pokemon.moves],
      exp: 0,
      maxExp: maxExp,
      hp: hp,
      stats: {
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
      },
      level: level,
    };
  };

  return { createPokemon };
};

export default useCreatePokemon;
