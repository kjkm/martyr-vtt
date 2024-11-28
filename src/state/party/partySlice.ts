import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Foundation {
  max: number;
  current: number;
  vice: number;
  balance: number;
  virtue: number;
}

export interface Character {
  id: string;
  name: string;
  epithet: string;
  thumbnail: string;
  rank: number;
  body: Foundation;
  mind: Foundation;
  soul: Foundation;
}

interface PartyState {
  name: string;
  members: Character[];
}

const initialState: PartyState = {
  name: "The Party",
  members: [],
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    },
    setBodyFoundation: (
      state,
      action: PayloadAction<{ id: string; foundation: Foundation }>
    ) => {
      const character = state.members.find(
        (member) => member.id === action.payload.id
      );
      if (character) {
        character.body = action.payload.foundation;
      }
    },
    setMindFoundation: (
      state,
      action: PayloadAction<{ id: string; foundation: Foundation }>
    ) => {
      const character = state.members.find(
        (member) => member.id === action.payload.id
      );
      if (character) {
        character.mind = action.payload.foundation;
      }
    },
    setSoulFoundation: (
      state,
      action: PayloadAction<{ id: string; foundation: Foundation }>
    ) => {
      const character = state.members.find(
        (member) => member.id === action.payload.id
      );
      if (character) {
        character.soul = action.payload.foundation;
      }
    },
  },
});

export const { addMember, removeMember, setBodyFoundation, setMindFoundation, setSoulFoundation } = partySlice.actions;
export default partySlice.reducer;
