import { useState } from "react";

export default function useFoeMoveSelection(foePokemon) {
  const chooseRandomMove = () => {
    if (
      !foePokemon ||
      !foePokemon.currentMoves ||
      foePokemon.currentMoves.length === 0
    ) {
      console.warn("Foe Pokémon has no available moves.");
      return null; // Return null if no moves available
    }

    const randomIndex = Math.floor(
      Math.random() * foePokemon.currentMoves.length
    );
    const move = foePokemon.currentMoves[randomIndex];

    return move; // ✅ This now correctly returns the selected move
  };

  return chooseRandomMove; // ✅ Return the function, so it can be called when needed
}
