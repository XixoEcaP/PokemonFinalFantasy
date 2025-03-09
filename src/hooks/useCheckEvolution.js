import { useDispatch } from "react-redux";
import { setPokemonTeam } from "../store/gameSlice"; // Dispatch action to update the team
import pokemons from "../data/pokemonData"; // Pokémon data
import useCreatePokemon from "../hooks/useCreatePokemon"; // Create Pokémon hook

const useCheckEvolution = () => {
  const dispatch = useDispatch();
  const { createPokemon } = useCreatePokemon();

  const evolvePokemon = (pokemon, level) => {
    if (pokemon.Evolutions && pokemon.Evolutions[1] <= level) {
      // Evolution: Create the evolved version of the Pokémon
      const evolvedSpecies = pokemons[pokemon.Evolutions[0]]; // Get the evolved species from the Evolutions array

      // Create evolved Pokémon
      const evolvedPokemon = createPokemon(evolvedSpecies, level);

      // Dispatch the evolved Pokémon to the Redux store
      dispatch(setPokemonTeam([evolvedPokemon]));
      return evolvedPokemon; // Return the evolved Pokémon
    }

    return pokemon; // Return the original Pokémon if no evolution happens
  };

  return { evolvePokemon };
};

export default useCheckEvolution;
