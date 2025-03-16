import React, { useState } from "react";

const Gamepad = () => {
  const [heldKey, setHeldKey] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

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
    if (intervalId) return; // Prevent multiple intervals for movement keys

    dispatchKeyEvent(key, "keydown");

    const id = setInterval(() => {
      dispatchKeyEvent(key, "keydown");
    }, 100);

    setHeldKey(key);
    setIntervalId(id);
  };

  const stopKeyPress = () => {
    if (heldKey) {
      dispatchKeyEvent(heldKey, "keyup");
    }
    clearInterval(intervalId);
    setIntervalId(null);
    setHeldKey(null);
  };

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
      {/* Arrows - Holdable */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={buttonStyle}
          onMouseDown={() => startKeyPress("ArrowUp")}
          onMouseUp={stopKeyPress}
          onMouseLeave={stopKeyPress}
          onTouchStart={() => startKeyPress("ArrowUp")}
          onTouchEnd={stopKeyPress}
          onTouchCancel={stopKeyPress}
        >
          ⬆️
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button
          style={buttonStyle}
          onMouseDown={() => startKeyPress("ArrowLeft")}
          onMouseUp={stopKeyPress}
          onClick={stopKeyPress}
          onMouseLeave={stopKeyPress}
          onTouchStart={() => startKeyPress("ArrowLeft")}
          onTouchEnd={stopKeyPress}
          onTouchCancel={stopKeyPress}
        >
          ⬅️
        </button>
        <button
          style={buttonStyle}
          onMouseDown={() => startKeyPress("ArrowRight")}
          onMouseUp={stopKeyPress}
          onMouseLeave={stopKeyPress}
          onTouchStart={() => startKeyPress("ArrowRight")}
          onTouchEnd={stopKeyPress}
          onTouchCancel={stopKeyPress}
        >
          ➡️
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={buttonStyle}
          onMouseDown={() => startKeyPress("ArrowDown")}
          onMouseUp={stopKeyPress}
          onMouseLeave={stopKeyPress}
          onTouchStart={() => startKeyPress("ArrowDown")}
          onTouchEnd={stopKeyPress}
          onTouchCancel={stopKeyPress}
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
