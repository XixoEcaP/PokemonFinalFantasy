const PokemonMenu = ({ team = [] }) => {
  if (!Array.isArray(team)) {
    console.error("PokemonMenu: team is not an array", team);
    return <div>Error: Pokémon not loaded</div>;
  }

  return (
    <div>
      {team.map((pokemon, index) => (
        <div key={index}>
          {pokemon.name} (Lvl: {pokemon.level})
        </div>
      ))}
    </div>
  );
};
export default PokemonMenu;
