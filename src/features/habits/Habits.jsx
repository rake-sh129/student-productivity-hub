import { useSelector } from "react-redux";
import HabitCard from "./HabitsCard";
import HabitForm from "./HabitsForm";
import HabitStats from "./HabitsStats";
import HabitsTip from "./HabitsTip";
import "../../styles/habits.css";

const Habits = () => {
  const { habits } = useSelector((state) => state.habits);

  return (
    <div className="habits-page">
      <div className="habits-container">
        <div className="habits-header">
          <div>
            <h1 className="habits-title">Habits Tracker</h1>
            <p className="habits-subtitle">
              Build consistency one day at a time.
            </p>
          </div>
        </div>

        <HabitStats habits={habits} />

        <div className="habits-grid">
          <div className="habits-main">
            <div className="panel">
              <h2 className="panel-title">Add a new habit</h2>
              <HabitForm />
            </div>

            <div className="panel">
              <h2 className="panel-title">Your habits</h2>
              <div className="habits-list">
                {habits.length > 0 ? (
                  habits.map((habit) => (
                    <HabitCard key={habit.id} habit={habit} />
                  ))
                ) : (
                  <div className="empty-state">
                    No habits yet. Add your first habit to start tracking.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="habits-sidebar">
            <HabitsTip/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;