import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../Stores/tasksSlice'
import notesReducer from "../Stores/notesSlice";
import habitsReducer from "./habitsSlice";
import pomodoroReducer from "./pomodoroSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    notes: notesReducer,
    habits: habitsReducer,
    pomodoro: pomodoroReducer,
  },
});

export default store;
