import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (text) => ({
        payload: { id: nanoid(), text, completed: false },
      }),
    },

    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },

    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
