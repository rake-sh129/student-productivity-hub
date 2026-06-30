import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './tasksSlice'
import notesReducer from "./notesSlice";
import habitsReducer from "./habitsSlice";
import pomodoroReducer from "./pomodoroSlice";
import goalsSlice from './goalsSlice'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    notes: notesReducer,
    habits: habitsReducer,
    pomodoro: pomodoroReducer,
    goals:goalsSlice,
  },
});

export default store;
