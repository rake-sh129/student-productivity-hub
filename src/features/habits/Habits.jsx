import { useReducer } from "react";
import HabitCard from "./HabitsCard";
import HabitForm from "./HabitsForm";
import HabitStats from "./HabitsStats";
import WeeklyTracker from "./WeeklyTracker";
import { habitsReducer, initialState } from "./habitsReducer";

const Habits = () => {
  const [state, dispatch] = useReducer(habitsReducer, initialState);

  return (
    <div>
      <h1>Habits Tracker</h1>
      <HabitForm dispatch={dispatch} />
      <HabitStats habits={state.habits} />

      <div>
        {state.habits.map((habit) => (
          <div key={habit.id}>
            <HabitCard habit={habit} dispatch={dispatch} />
            <WeeklyTracker habit={habit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habits;