import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import firebaseApp from "../../firebase";

export interface UserState {
  user: {
    id: string;
    name: string;
    games: string[];
  };
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    games: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setName: (state, action) => {
      state.user.name = action.payload;
    },
    addGame: (state, action) => {
      state.user.games.push(action.payload);
    },
    removeGame: (state, action) => {
      state.user.games = state.user.games.filter(
        (game) => game !== action.payload
      );
    },
  },
});

export const { setUser, setName, addGame, removeGame } = userSlice.actions;

export default userSlice.reducer;