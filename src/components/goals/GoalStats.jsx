export default function GoalsStats({ goals }) {
  const totalGoals = goals.length;

  const completedGoals =
    goals.filter((goal) => goal.completed).length;

  const completionRate =
    totalGoals > 0
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;

  return (
    <div>
      <h3>Total Goals: {totalGoals}</h3>

      <h3>
        Completed Goals: {completedGoals}
      </h3>

      <h3>
        Completion Rate: {completionRate}%
      </h3>
    </div>
  );
}