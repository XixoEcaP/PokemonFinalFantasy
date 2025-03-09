import React from "react";
import button from "../../../assets/selectMenu/pokemons.png";
import buttonSelected from "../../../assets/selectMenu/pokemon.png";

const Pokemon = ({ isSelected }) => {
  return (
    <div
      style={{
        width: "110px",
        height: "46px",
        background: `url(${
          isSelected ? buttonSelected : button
        }) no-repeat center/contain`,
        position: "absolute",
        top: 0,
        right: 0, // Position it at the top left of the menu
      }}
    />
  );
};

export default Pokemon;
