import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

export const fetchParty = (partyId: string): AppThunk => async (dispatch) => {
  const db = getFirestore();
  const partyDoc = await doc(db, "parties", partyId).get();
  if (partyDoc.exists()) {
    dispatch(setParty(partyDoc.data() as PartyState));
  }
};

export const addMemberToParty = (partyId: string, member: Character): AppThunk => async (dispatch) => {
  const db = getFirestore();
  const partyRef = doc(db, "parties", partyId);
  await updateDoc(partyRef, {
    members: arrayUnion(member),
  });
  dispatch(addMember(member));
};

export const removeMemberFromParty = (partyId: string, memberId: string): AppThunk => async (dispatch) => {
  const db = getFirestore();
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await partyRef.get();
  if (partyDoc.exists()) {
    const members = partyDoc.data().members.filter((member: Character) => member.id !== memberId);
    await updateDoc(partyRef, { members });
    dispatch(removeMember(memberId));
  }
};

export const updateBodyFoundation = (partyId: string, id: string, foundation: Foundation): AppThunk => async (dispatch) => {
  const db = getFirestore();
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await partyRef.get();
  if (partyDoc.exists()) {
    const members = partyDoc.data().members.map((member: Character) =>
      member.id === id ? { ...member, body: foundation } : member
    );
    await updateDoc(partyRef, { members });
    dispatch(setBodyFoundation({ id, foundation }));
  }
};

export const updateMindFoundation = (partyId: string, id: string, foundation: Foundation): AppThunk => async (dispatch) => {
  const db = getFirestore();
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await partyRef.get();
  if (partyDoc.exists()) {
    const members = partyDoc.data().members.map((member: Character) =>
      member.id === id ? { ...member, mind: foundation } : member
    );
    await updateDoc(partyRef, { members });
    dispatch(setMindFoundation({ id, foundation }));
  }
};

export const updateSoulFoundation = (partyId: string, id: string, foundation: Foundation): AppThunk => async (dispatch) => {
  const db = getFirestore();
  const partyRef = doc(db, "parties", partyId);
  const partyDoc = await partyRef.get();
  if (partyDoc.exists()) {
    const members = partyDoc.data().members.map((member: Character) =>
      member.id === id ? { ...member, soul: foundation } : member
    );
    await updateDoc(partyRef, { members });
    dispatch(setSoulFoundation({ id, foundation }));
  }
};

export default partySlice.reducer;
