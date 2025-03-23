import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pauseMenuBg from "../../assets/pausemenu.png";
import { setState } from "../../store/battleSlice";
import {
  setMessages,
  setCurrentItemIndex,
  useItem,
} from "../../store/gameSlice";
import PokemonBattleMenu from "./PokemonBattleMenu";

const BagBattleMenu = () => {
  const items = useSelector((state) => state.game.items);
  const dispatch = useDispatch();
  const keyHandler = useSelector((state) => state.game.keyHandler);
  const [pokemonMenu, setPokemonMenu] = useState(false);
  const [selectedItemIndex, setSelectedTtemIndex] = useState(0);

  useEffect(() => {
    dispatch(setCurrentItemIndex(selectedItemIndex));
  }, [selectedItemIndex, dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "z" && pokemonMenu) {
      setPokemonMenu(false);
    }
    if (keyHandler === "MessageKeyboardHandler" || pokemonMenu) return;

    const selectedItem = items[selectedItemIndex]?.item;

    if (e.key === "ArrowUp") {
      setSelectedTtemIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "ArrowDown") {
      setSelectedTtemIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "x") {
      if (selectedItem === "Pokeball") {
        console.log(selectedItem + "selected");
        dispatch(setState("catching"));
        dispatch(setMessages([`${selectedItem} used`]));
        dispatch(useItem(selectedItem));
      } else if (selectedItem === "Potion") {
        setPokemonMenu(true);
      } else {
        dispatch(setState("home"));
        dispatch(useItem(selectedItem));
        dispatch(setMessages([`${selectedItem} used`]));
      }
    } else if (e.key === "z" && !pokemonMenu) {
      dispatch(setState("home"));
    } else if (e.key === "z" && pokemonMenu) {
      setPokemonMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, items, keyHandler, pokemonMenu]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: `${5 * 32}px`,
        height: `${9 * 32}px`,
        background: `url(${pauseMenuBg}) no-repeat center/contain`,
        color: "white",
        fontSize: "16px",
        lineHeight: "1.5",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {items.map((item, index) => (
        <div key={index} style={{ marginLeft: "20px" }}>
          {selectedItemIndex === index ? "=> " : ""}
          {item.item} x{item.x}
        </div>
      ))}
      {pokemonMenu && <PokemonBattleMenu />}
    </div>
  );
};

export default BagBattleMenu;
