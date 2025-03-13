import React from "react";

const Gamepad = () => {
  const dispatchKeyEvent = (key) => {
    const eventOptions = {
      key,
      code: key,
      bubbles: true,
      cancelable: true,
    };

    document.dispatchEvent(new KeyboardEvent("keydown", eventOptions));

    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent("keyup", eventOptions));
    }, 50);
  };

  // Style for Arrow buttons
  const arrowButtonStyle = {
    padding: "4px 6px",
    fontSize: "12px",
    cursor: "pointer",
    width: "32px",
    height: "32px",
  };

  // Style for X and Z buttons
  const actionButtonStyle = {
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
    width: "64px",
    height: "32px",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "80px",
      }}
    >
      {/* Arrow Up */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={arrowButtonStyle}
          onClick={() => dispatchKeyEvent("ArrowUp")}
        >
          ⬆️
        </button>
      </div>

      {/* Arrow Left and Right */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button
          style={arrowButtonStyle}
          onClick={() => dispatchKeyEvent("ArrowLeft")}
        >
          ⬅️
        </button>
        <button
          style={arrowButtonStyle}
          onClick={() => dispatchKeyEvent("ArrowRight")}
        >
          ➡️
        </button>
      </div>

      {/* Arrow Down */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={arrowButtonStyle}
          onClick={() => dispatchKeyEvent("ArrowDown")}
        >
          ⬇️
        </button>
      </div>

      {/* Action buttons (Z and X) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <button style={arrowButtonStyle} onClick={() => dispatchKeyEvent("z")}>
          Z
        </button>
        <button style={actionButtonStyle} onClick={() => dispatchKeyEvent("x")}>
          X
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <button style={actionButtonStyle} onClick={() => dispatchKeyEvent(" ")}>
          space
        </button>
      </div>
    </div>
  );
};

export default Gamepad;
