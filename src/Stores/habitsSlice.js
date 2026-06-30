import { createSlice } from "@reduxjs/toolkit";

const today = () => new Date().toISOString().split("T")[0];

const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
  },
  reducers: {
    addHabit: (state, action) => {
      state.habits.push({
        id: Date.now(),
        title: action.payload,
        streak: 0,
        completedDates: [],
      });
    },

    deleteHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },

    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (!habit) return;

      const todayDate = today();
      const alreadyCompleted = habit.completedDates.includes(todayDate);

      if (alreadyCompleted) {
        habit.completedDates = habit.completedDates.filter(
          (date) => date !== todayDate
        );
      } else {
        habit.completedDates.push(todayDate);
      }

      habit.streak = habit.completedDates.length;
    },
  },
});

export const { addHabit, deleteHabit, toggleHabit } = habitsSlice.actions;
export default habitsSlice.reducer;