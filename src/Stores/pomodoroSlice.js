import { createSlice } from "@reduxjs/toolkit";

export const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    mode: "focus",
    timeLeft: MODES.focus,
    isRunning: false,
    sessionsCompleted: 0,
    focusMinutes: 0,
  },
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },

    pause: (state) => {
      state.isRunning = false;
    },

    reset: (state) => {
      state.isRunning = false;
      state.timeLeft = MODES[state.mode];
    },

    changeMode: (state, action) => {
      state.mode = action.payload;
      state.timeLeft = MODES[action.payload];
      state.isRunning = false;
    },

    tick: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.isRunning = false;
      }
    },
  },
});

export const { start, pause, reset, changeMode, tick } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
