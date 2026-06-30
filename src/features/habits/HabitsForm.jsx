import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../../Stores/habitsSlice";

const HabitForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addHabit(text));
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Enter a habit like Drink water or Read 20 mins"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3.5 text-sm font-medium text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.06)] outline-none transition duration-200 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-linear-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(16,185,129,0.24)] transition duration-200 hover:-translate-y-0.5 hover:from-emerald-600 hover:to-emerald-700 active:translate-y-0"
      >
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;