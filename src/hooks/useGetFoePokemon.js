import { useSelector } from "react-redux";
import { useCallback } from "react";
import pokemonBattles from "../data/pokemonsBattles";

export default function useGetFoePokemon() {
  const currentMap = useSelector((state) => state.game.map);

  // ✅ Use useCallback to prevent function recreation on every render
  const getRandomPokemon = useCallback(() => {
    const pokemonsForMap = pokemonBattles[currentMap];
    if (!pokemonsForMap) {
      console.warn(`No Pokémon data found for map: ${currentMap}`);
      return null;
    }

    const totalWeight = pokemonsForMap.reduce(
      (sum, { chance }) => sum + chance,
      0
    );
    let randomNum = Math.random() * totalWeight;

    for (const { pokemon, chance } of pokemonsForMap) {
      if (randomNum < chance) {
        return pokemon;
      }
      randomNum -= chance;
    }

    return null; // Fallback (should never happen)
  }, [currentMap]); // ✅ Memoize based on currentOvmap

  return getRandomPokemon;
}
