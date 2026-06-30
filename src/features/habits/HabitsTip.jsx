/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const HabitTip = () => {
  const [tip, setTip] = useState("Loading tip...");
  const [loading, setLoading] = useState(true);

  const fetchTip = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setTip(data?.slip?.advice || "Stay consistent. Small progress matters.");
    } catch (error) {
      setTip("Stay consistent. Small progress matters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Daily Tip</h2>
        <button
          onClick={fetchTip}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Refresh
        </button>
      </div>

      <p className="text-sm leading-6 text-slate-600">
        {loading ? "Loading tip..." : tip}
      </p>
    </div>
  );
};

export default HabitTip;