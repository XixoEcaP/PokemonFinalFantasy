import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";

const Gamepad = () => {
  const [heldKey, setHeldKey] = useState(null);
  const intervalIdRef = useRef(null); // Use ref to prevent interval issues

  const battle = useSelector((state) => state.game.battle); // True = Battle Mode, False = Overworld
  const isPaused = useSelector((state) => state.game.isPaused); // True = Battle Mode, False = Overworld
  const booleanBox = useSelector((state) => state.game.booleanBox); // True = Battle Mode, False = Overworld

  const gameState = useMemo(
    () => battle || isPaused || booleanBox,
    [battle, isPaused, booleanBox]
  );

  const isClickMode = gameState === true; // If in battle, use click mode

  const dispatchKeyEvent = (key, type) => {
    const eventOptions = {
      key,
      code: key,
      bubbles: true,
      cancelable: true,
    };
    document.dispatchEvent(new KeyboardEvent(type, eventOptions));
  };

  const startKeyPress = (key) => {
    if (intervalIdRef.current) return; // Prevent multiple intervals

    dispatchKeyEvent(key, "keydown");

    if (!isClickMode) {
      intervalIdRef.current = setInterval(() => {
        dispatchKeyEvent(key, "keydown");
      }, 100);
      setHeldKey(key);
    } else {
      setTimeout(() => dispatchKeyEvent(key, "keyup"), 50);
    }
  };

  const stopKeyPress = () => {
    if (heldKey) {
      dispatchKeyEvent(heldKey, "keyup");
    }
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setHeldKey(null);
  };

  // Cleanup when game state changes (avoid key "sticking" issues)
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isClickMode]);

  // Styles
  const buttonStyle = {
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
    width: "64px",
    height: "32px",
    fontWeight: "bold",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    touchAction: "none",
    WebkitTouchCallout: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "80px",
        marginTop: "80px",
      }}
    >
      {/* Debugging - Check game state */}
      {console.log("Game State (battle mode):", gameState)}

      {/* Arrows - Click Mode or Hold Mode */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={buttonStyle}
          {...(isClickMode
            ? { onClick: () => startKeyPress("ArrowUp") }
            : {
                onMouseDown: () => startKeyPress("ArrowUp"),
                onMouseUp: stopKeyPress,
                onMouseLeave: stopKeyPress,
                onTouchStart: () => startKeyPress("ArrowUp"),
                onTouchEnd: stopKeyPress,
                onTouchCancel: stopKeyPress,
              })}
        >
          ⬆️
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button
          style={buttonStyle}
          {...(isClickMode
            ? { onClick: () => startKeyPress("ArrowLeft") }
            : {
                onMouseDown: () => startKeyPress("ArrowLeft"),
                onMouseUp: stopKeyPress,
                onMouseLeave: stopKeyPress,
                onTouchStart: () => startKeyPress("ArrowLeft"),
                onTouchEnd: stopKeyPress,
                onTouchCancel: stopKeyPress,
              })}
        >
          ⬅️
        </button>
        <button
          style={buttonStyle}
          {...(isClickMode
            ? { onClick: () => startKeyPress("ArrowRight") }
            : {
                onMouseDown: () => startKeyPress("ArrowRight"),
                onMouseUp: stopKeyPress,
                onMouseLeave: stopKeyPress,
                onTouchStart: () => startKeyPress("ArrowRight"),
                onTouchEnd: stopKeyPress,
                onTouchCancel: stopKeyPress,
              })}
        >
          ➡️
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={buttonStyle}
          {...(isClickMode
            ? { onClick: () => startKeyPress("ArrowDown") }
            : {
                onMouseDown: () => startKeyPress("ArrowDown"),
                onMouseUp: stopKeyPress,
                onMouseLeave: stopKeyPress,
                onTouchStart: () => startKeyPress("ArrowDown"),
                onTouchEnd: stopKeyPress,
                onTouchCancel: stopKeyPress,
              })}
        >
          ⬇️
        </button>
      </div>

      {/* Action Buttons - Click Only */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <button
          style={buttonStyle}
          onClick={() => {
            dispatchKeyEvent("z", "keydown");
            setTimeout(() => dispatchKeyEvent("z", "keyup"), 50);
          }}
        >
          Z
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            dispatchKeyEvent("x", "keydown");
            setTimeout(() => dispatchKeyEvent("x", "keyup"), 50);
          }}
        >
          X
        </button>
      </div>

      {/* Space Button - Click Only */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <button
          style={buttonStyle}
          onClick={() => {
            dispatchKeyEvent(" ", "keydown");
            setTimeout(() => dispatchKeyEvent(" ", "keyup"), 50);
          }}
        >
          Space
        </button>
      </div>
    </div>
  );
};

export default Gamepad;
