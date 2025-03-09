import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./gameSlice";
import battlReducer from "./battleSlice";
// If you don't use battle yet, comment this out

const store = configureStore({
  reducer: {
    game: gameReducer,
    battle: battlReducer,
  },
});

export default store;
