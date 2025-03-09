import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Game from "./components/Game"; // ✅ Ensure Game is imported like this

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
