import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import partyReducer from "./party/partySlice";
import userReducer from "./user/userSlice";
import environmentReducer from "./environment/environmentSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    party: partyReducer,
    user: userReducer,
    environments: environmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
