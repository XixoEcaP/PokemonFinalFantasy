import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPause, setMessages, setKeyHandler } from "../store/gameSlice";

const BagMenu = () => {
  const items = useSelector((state) => state.game.items);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "x") {
      const selectedItem = items[selectedIndex]?.item;
      const quantity = items[selectedIndex]?.x;
      dispatch(setMessages([`Selected: ${selectedItem} x${quantity}`]));
    } else if (e.key === "z") {
      dispatch(setPause(false));
      dispatch(setMessages([""]));
      dispatch(setKeyHandler("WorldKeyboardHandler"));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, items]);

  return (
    <div style={{ color: "white", fontSize: "16px", marginLeft: "20px" }}>
      {items.map((item, index) => (
        <div key={index}>
          {selectedIndex === index ? "=> " : ""}
          {item.item} x{item.x}
        </div>
      ))}
    </div>
  );
};

export default BagMenu;
