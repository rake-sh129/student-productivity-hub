import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getNotes } from "../features/notes/notesService";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: getNotes(), // hydrate from localStorage on startup
  },
  reducers: {
    addNote: {
      reducer: (state, action) => {
        state.notes.push(action.payload);
      },
      prepare: (noteData) => ({
        payload: { id: nanoid(), ...noteData },
      }),
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    updateNote: (state, action) => {
      const { id, data } = action.payload;
      const index = state.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...data };
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
