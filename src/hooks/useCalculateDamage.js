// hooks/useCalculateDamage.js
const useCalculateDamage = () => {
  const calculateDamage = (attacker, defender, move) => {
    if (!attacker || !defender || !move) return 0;

    const level = attacker.level;
    const power = move.power;
    const attack =
      move.category === "Physical"
        ? attacker.stats.attack
        : attacker.stats.specialAttack;
    const defense =
      move.category === "Physical"
        ? defender.stats.defense
        : defender.stats.specialDefense;

    const critical = Math.random() < 0.1 ? 1.5 : 1;
    const STAB = attacker.type.includes(move.type) ? 1.5 : 1;

    const typeEffectiveness = {
      Normal: { Rock: 0.5, Ghost: 0 },
      Fire: { Grass: 2, Water: 0.5, Fire: 0.5 },
      Water: { Fire: 2, Grass: 0.5, Water: 0.5 },
      Electric: { Water: 2, Electric: 0.5, Ground: 0 },
    };

    const effectiveness = typeEffectiveness[move.type]?.[defender.type] || 1;

    const damage =
      ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
      critical *
      STAB *
      effectiveness;

    return Math.floor(damage);
  };

  return calculateDamage; // ✅ returns a function
};

export default useCalculateDamage;
