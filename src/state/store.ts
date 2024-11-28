import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import partyReducer from "./party/partySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    party: partyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
