import { createSlice } from "@reduxjs/toolkit";

interface Foundation {
  max: number;
  current: number;
  vice: number;
  balance: number;
  virtue: number;
}

interface Character {
  id: string;
  name: string;
  epithet: string;
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
  },
});

export const { addMember, removeMember } = partySlice.actions;
export default partySlice.reducer;
