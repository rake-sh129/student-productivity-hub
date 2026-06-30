import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "student_goals_hub";

const defaultGoals = [
  {
    id: "g-1",
    title: "Complete React Project",
    description: "Finish and submit the React goals tracker.",
    category: "Study",
    targetValue: 100,
    currentProgress: 60,
    deadline: "2026-06-30",
    completed: false,
  },
  {
    id: "g-2",
    title: "Morning Run",
    description: "Run regularly to improve stamina.",
    category: "Health",
    targetValue: 10,
    currentProgress: 4,
    deadline: "2026-06-30",
    completed: false,
  },
];

const loadGoalsFromStorage = () => {
  try {
    const savedGoals = localStorage.getItem(STORAGE_KEY);
    return savedGoals ? JSON.parse(savedGoals) : defaultGoals;
  } catch {
    return defaultGoals;
  }
};

const persistGoals = (goals) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error("Failed to save goals:", error);
  }
};

const initialState = {
  items: loadGoalsFromStorage(),
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.items.push(action.payload);
      persistGoals(state.items);
    },

    editGoal: (state, action) => {
      state.items = state.items.map((goal) =>
        goal.id === action.payload.id ? action.payload : goal
      );
      persistGoals(state.items);
    },

    deleteGoal: (state, action) => {
      state.items = state.items.filter((goal) => goal.id !== action.payload);
      persistGoals(state.items);
    },

    updateGoalProgress: (state, action) => {
      const { id, progress } = action.payload;

      state.items = state.items.map((goal) => {
        if (goal.id !== id) return goal;

        const safeProgress = Math.max(
          0,
          Math.min(goal.targetValue, Number(progress))
        );

        return {
          ...goal,
          currentProgress: safeProgress,
          completed: safeProgress >= goal.targetValue,
        };
      });

      persistGoals(state.items);
    },

    toggleGoalComplete: (state, action) => {
      state.items = state.items.map((goal) =>
        goal.id === action.payload
          ? {
              ...goal,
              completed: !goal.completed,
              currentProgress: !goal.completed ? goal.targetValue : 0,
            }
          : goal
      );

      persistGoals(state.items);
    },

    setGoals: (state, action) => {
      state.items = action.payload;
      persistGoals(state.items);
    },

    resetGoals: (state) => {
      state.items = defaultGoals;
      persistGoals(state.items);
    },
  },
});

export const {
  addGoal,
  editGoal,
  deleteGoal,
  updateGoalProgress,
  toggleGoalComplete,
  setGoals,
  resetGoals,
} = goalsSlice.actions;

export default goalsSlice.reducer;