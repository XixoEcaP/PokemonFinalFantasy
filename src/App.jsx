import { Provider } from "react-redux";
import store from "./store/store";

import React, { useEffect } from "react";
import Game from "./components/Game";
import Gamepad from "./components/Gamepad";

function App() {
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (["+", "-", "=", "0"].includes(e.key)) {
          e.preventDefault();
        }
      }
    };

    const preventWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventZoom);
    window.addEventListener("wheel", preventWheelZoom, { passive: false });

    return () => {
      window.removeEventListener("keydown", preventZoom);
      window.removeEventListener("wheel", preventWheelZoom);
    };
  }, []);

  return (
    <Provider store={store}>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <Game />
        <Gamepad />
      </div>
    </Provider>
  );
}

export default App;
