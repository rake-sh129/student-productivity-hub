import { useDispatch } from "react-redux";
import { toggleHabit, deleteHabit } from "../../Stores/habitsSlice";
import WeeklyTracker from "./WeeklyTracker";

const HabitsCard = ({ habit }) => {
  const dispatch = useDispatch();
  const todayDate = new Date().toISOString().split("T")[0];
  const completedToday = habit.completedDates.includes(todayDate);

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
            Daily Habit
          </div>

          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            {habit.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Stay consistent and update your progress every day.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(toggleHabit(habit.id))}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition duration-200 ${
              completedToday
                ? "bg-linear-to-r from-amber-400 to-orange-500 shadow-[0_10px_20px_rgba(245,158,11,0.22)] hover:from-amber-500 hover:to-orange-600"
                : "bg-linear-to-r from-emerald-500 to-emerald-600 shadow-[0_10px_20px_rgba(16,185,129,0.22)] hover:from-emerald-600 hover:to-emerald-700"
            }`}
          >
            {completedToday ? "Completed Today ✓" : "Mark Complete"}
          </button>

          <button
            onClick={() => dispatch(deleteHabit(habit.id))}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition duration-200 hover:bg-rose-100"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
        <WeeklyTracker habit={habit} />
      </div>
    </div>
  );
};

export default HabitsCard;