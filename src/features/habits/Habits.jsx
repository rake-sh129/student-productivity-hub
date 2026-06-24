import { useSelector } from "react-redux";
import HabitCard from "./HabitsCard";
import HabitForm from "./HabitsForm";
import HabitStats from "./HabitsStats";
import WeeklyTracker from "./WeeklyTracker";

const Habits = () => {
  const { habits } = useSelector((state) => state.habits);

  return (
    <div>
      <h1>Habits Tracker</h1>

      <HabitForm />

      <HabitStats habits={habits} />

      <div>
        {habits.map((habit) => (
          <div key={habit.id}>
            <HabitCard habit={habit} />
            <WeeklyTracker habit={habit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habits;
