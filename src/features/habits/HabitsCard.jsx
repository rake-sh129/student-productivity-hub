import { useDispatch } from "react-redux";
import { toggleHabit, deleteHabit } from "../../Stores/habitsSlice";
import WeeklyTracker from "./WeeklyTracker";

const HabitsCard = ({ habit }) => {
  const dispatch = useDispatch();
  const todayDate = new Date().toISOString().split("T")[0];
  const completedToday = habit.completedDates.includes(todayDate);

  return (
    <div>
      <h3>{habit.title}</h3>

      <button onClick={() => dispatch(toggleHabit(habit.id))}>
        {completedToday ? "Completed Today ✓" : "Mark Complete"}
      </button>

      <button onClick={() => dispatch(deleteHabit(habit.id))}>
        Delete Habit
      </button>

      <WeeklyTracker habit={habit} />
    </div>
  );
};

export default HabitsCard;
