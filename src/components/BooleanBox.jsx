import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import battleBoxSrc from "../assets/booleanbox.png";
import {
  setBooleanBox,
  setBooleanChoice,
  setKeyHandler,
  setMessages,
  setCurrentIndex,
} from "../store/gameSlice";

const BooleanBox = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(true);
  const booleanBox = useSelector((state) => state.game.booleanBox);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setSelected((prev) => !prev);
      }
      if (e.key.toLowerCase() === "x") {
        dispatch(setBooleanChoice(selected)); // ✅ Set state with player choice
        dispatch(setBooleanBox(false)); // ✅ Close BooleanBox
        dispatch(setMessages([])); // ✅ Clear messages
        dispatch(setKeyHandler("WorldKeyboardHandler")); // ✅ Return control to world
        dispatch(setCurrentIndex(0)); // ✅ Reset message index
      }
    };

    if (booleanBox) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [booleanBox, selected, dispatch]);

  return useMemo(
    () =>
      booleanBox && (
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "387px",
            width: "124px",
            height: "96px",
            background: `url(${battleBoxSrc}) no-repeat center/contain`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "16px",
          }}
        >
          <div>{selected ? "=> Yes" : "Yes"}</div>
          <div>{!selected ? "=> No" : "No"}</div>
        </div>
      ),
    [booleanBox, selected]
  );
};

export default BooleanBox;
