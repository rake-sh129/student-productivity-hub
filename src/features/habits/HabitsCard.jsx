import WeeklyTracker from "./WeeklyTracker";

const HabitsCard = ({ habit, dispatch }) => {
  const todayDate =
    new Date().toISOString().split("T")[0];

  const completedToday =
    habit.completedDates.includes(todayDate);

  return (
    <div>
      <h3>{habit.title}</h3>

      <button
        onClick={() =>
          dispatch({
            type: "TOGGLE_HABIT",
            payload: habit.id,
          })
        }
      >
        {completedToday
          ? "Completed Today ✓"
          : "Mark Complete"}
      </button>

      <WeeklyTracker habit={habit} />
    </div>
  );
};

export default HabitsCard