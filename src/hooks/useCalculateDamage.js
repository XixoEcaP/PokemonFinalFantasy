// hooks/useCalculateDamage.js
const useCalculateDamage = () => {
  const calculateDamage = (attacker, defender, move) => {
    if (!attacker || !defender || !move)
      return { damage: 0, effectiveness: "Normal" };

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
      Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
      Fire: {
        Fire: 0.5,
        Water: 0.5,
        Grass: 2,
        Ice: 2,
        Bug: 2,
        Rock: 0.5,
        Dragon: 0.5,
        Steel: 2,
      },
      Water: {
        Fire: 2,
        Water: 0.5,
        Grass: 0.5,
        Ground: 2,
        Rock: 2,
        Dragon: 0.5,
      },
      Electric: {
        Water: 2,
        Electric: 0.5,
        Grass: 0.5,
        Ground: 0,
        Flying: 2,
        Dragon: 0.5,
      },
      Grass: {
        Fire: 0.5,
        Water: 2,
        Grass: 0.5,
        Poison: 0.5,
        Ground: 2,
        Flying: 0.5,
        Bug: 0.5,
        Rock: 2,
        Dragon: 0.5,
        Steel: 0.5,
      },
      Ice: {
        Fire: 0.5,
        Water: 0.5,
        Grass: 2,
        Ice: 0.5,
        Ground: 2,
        Flying: 2,
        Dragon: 2,
        Steel: 0.5,
      },
      Fighting: {
        Normal: 2,
        Ice: 2,
        Rock: 2,
        Dark: 2,
        Steel: 2,
        Poison: 0.5,
        Flying: 0.5,
        Psychic: 0.5,
        Bug: 0.5,
        Ghost: 0,
      },
      Poison: {
        Grass: 2,
        Poison: 0.5,
        Ground: 0.5,
        Rock: 0.5,
        Ghost: 0.5,
        Steel: 0,
      },
      Ground: {
        Fire: 2,
        Electric: 2,
        Grass: 0.5,
        Poison: 2,
        Flying: 0,
        Bug: 0.5,
        Rock: 2,
        Steel: 2,
      },
      Flying: {
        Electric: 0.5,
        Grass: 2,
        Fighting: 2,
        Bug: 2,
        Rock: 0.5,
        Steel: 0.5,
      },
      Psychic: {
        Fighting: 2,
        Poison: 2,
        Psychic: 0.5,
        Dark: 0,
        Steel: 0.5,
      },
      Bug: {
        Fire: 0.5,
        Grass: 2,
        Fighting: 0.5,
        Poison: 0.5,
        Flying: 0.5,
        Psychic: 2,
        Ghost: 0.5,
        Dark: 2,
        Steel: 0.5,
      },
      Rock: {
        Fire: 2,
        Ice: 2,
        Fighting: 0.5,
        Ground: 0.5,
        Flying: 2,
        Bug: 2,
        Steel: 0.5,
      },
      Ghost: {
        Normal: 0,
        Psychic: 2,
        Ghost: 2,
        Dark: 0.5,
      },
      Dragon: { Dragon: 2, Steel: 0.5 },
      Dark: { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Steel: 0.5 },
      Steel: {
        Fire: 0.5,
        Water: 0.5,
        Electric: 0.5,
        Ice: 2,
        Rock: 2,
        Steel: 0.5,
      },
    };

    // Handle dual types
    const defenderTypes = Array.isArray(defender.type)
      ? defender.type
      : [defender.type];

    let effectiveness = 1;
    for (const defType of defenderTypes) {
      const eff = typeEffectiveness[move.type]?.[defType] ?? 1;
      effectiveness *= eff;
    }

    let effectivenessText = "";
    if (effectiveness === 0) {
      effectivenessText = "It has no Effect";
    } else if (effectiveness < 1) {
      effectivenessText = "It's not Very Effective";
    } else if (effectiveness > 1) {
      effectivenessText = "It's Super Effective";
    }

    const damage =
      ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
      critical *
      STAB *
      effectiveness;

    return {
      damage: Math.floor(damage),
      effectiveness: effectivenessText,
    };
  };

  return calculateDamage;
};

export default useCalculateDamage;
