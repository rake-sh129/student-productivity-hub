/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fetchTip = async () => {
  try {
    setLoading(true);

    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_NINJAS_KEY,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    setTip(
      data.length
        ? `"${data[0].quote}" — ${data[0].author}`
        : "Stay consistent. Small progress matters."
    );
  } catch (error) {
    setTip("Stay consistent. Small progress matters.");
  } finally {
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 text-slate-100 placeholder-slate-500 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-500">Daily Tip</h2>
        <button
          onClick={fetchTip}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Refresh
        </button>
      </div>

      <p className="text-sm leading-6 text-slate-400">
        {loading ? "Loading tip..." : tip}
      </p>
    </div>
  );

};

export default fetchTip