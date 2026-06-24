
const Achievements = ({
  tasks = [],
  habits = [],
  weeklyData = {
    thisWeekTasks: 0,
    lastWeekTasks: 0,
    thisWeekHabits: 0,
    lastWeekHabits: 0,
  },
  streak = 0,
}) => {
  // -----------------------------
  // BASIC STATS
  // -----------------------------
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completed).length;

  const productivityScore =
    totalTasks + totalHabits === 0
      ? 0
      : Math.round(((completedTasks + completedHabits) / (totalTasks + totalHabits)) * 100);

  // -----------------------------
  // WEEKLY COMPARISON
  // -----------------------------
  const taskChange =
    weeklyData.lastWeekTasks === 0
      ? 100
      : Math.round(
          ((weeklyData.thisWeekTasks - weeklyData.lastWeekTasks) /
            weeklyData.lastWeekTasks) *
            100
        );

  const habitChange =
    weeklyData.lastWeekHabits === 0
      ? 100
      : Math.round(
          ((weeklyData.thisWeekHabits - weeklyData.lastWeekHabits) /
            weeklyData.lastWeekHabits) *
            100
        );

  // -----------------------------
  // BADGES SYSTEM
  // -----------------------------
  const badges = [];

  if (streak >= 7) badges.push({ name: "7 Day Streak 🔥", desc: "Consistency is building!" });
  if (streak >= 30) badges.push({ name: "30 Day Warrior ⚡", desc: "Unstoppable focus!" });

  if (completedTasks >= 10)
    badges.push({ name: "Task Starter 🎯", desc: "10+ tasks completed" });

  if (completedTasks >= 50)
    badges.push({ name: "Task Master 🧠", desc: "50+ tasks completed" });

  if (completedHabits >= 20)
    badges.push({ name: "Habit Builder 🏗️", desc: "20+ habits completed" });

  if (productivityScore >= 80)
    badges.push({ name: "High Performer 🚀", desc: "80%+ productivity" });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">🏆 Achievements</h2>

      {/* ---------------- STATS CARDS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Tasks</h3>
          <p className="text-2xl font-bold">{completedTasks}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Habits</h3>
          <p className="text-2xl font-bold">{completedHabits}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Streak</h3>
          <p className="text-2xl font-bold">{streak} 🔥</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Productivity</h3>
          <p className="text-2xl font-bold">{productivityScore}%</p>
        </div>
      </div>

      {/* ---------------- WEEKLY COMPARISON ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">📅 Weekly Comparison</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">Tasks Change</p>
            <p
              className={`text-xl font-bold ${
                taskChange >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {taskChange > 0 ? "+" : ""}
              {taskChange}%
            </p>
          </div>

          <div>
            <p className="text-gray-600">Habits Change</p>
            <p
              className={`text-xl font-bold ${
                habitChange >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {habitChange > 0 ? "+" : ""}
              {habitChange}%
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- BADGES ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">🏅 Badges Earned</h3>

        {badges.length === 0 ? (
          <p className="text-gray-500">No badges yet. Keep going 🚀</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.map((b, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-linear-to-r from-indigo-50 to-purple-50"
              >
                <h4 className="font-bold">{b.name}</h4>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;