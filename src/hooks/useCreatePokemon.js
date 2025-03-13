const useCreatePokemon = () => {
  const calculateStats = (baseStat, level, isHP = false) => {
    if (isHP) {
      // HP formula: (stat * 2 * level) / 100 + level + 10
      return Math.floor((baseStat * 2 * level) / 100 + level + 10);
    }
    // Other stats formula: (stat * 2 * level) / 100 + 5
    return Math.floor((baseStat * 2 * level) / 100 + 5);
  };

  const createPokemon = (species, level, name = "") => {
    // Species refers to the Pokémon's species name (e.g., "Levia")
    const pokemon = species; // Assume species is a Pokémon object

    // Calculate stats based on formulas
    const hp = calculateStats(pokemon.hp, level, true);
    const attack = calculateStats(pokemon.attack, level);
    const defense = calculateStats(pokemon.defense, level);
    const specialAttack = calculateStats(pokemon.specialAttack, level);
    const specialDefense = calculateStats(pokemon.specialDefense, level);
    const speed = calculateStats(pokemon.speed, level);

    // Ensure that all properties are passed correctly from the species object
    return {
      name: name || pokemon.specie, // Name is either provided or defaults to species name
      specie: pokemon.specie, // Species is always set to the species object
      type: pokemon.type, // Add types
      sprites: pokemon.sprites, // Add sprites
      evolutions: pokemon.Evolutions, // Add evolutions
      currentMoves: [...pokemon.moves], // Moves array, repeat if necessary
      exp: 0, // Initial experience set to 0
      hp: hp,
      stats: {
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
      },
      level: level, // Set level in the object
    };
  };

  return { createPokemon };
};

export default useCreatePokemon;
