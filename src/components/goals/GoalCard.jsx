export default function GoalCard({
  goal,
  onDelete,
  onEdit,
  onToggleComplete,
}) {
  const percentage =
    (goal.currentProgress / goal.targetValue) * 100;

  return (
    <div>
      <h3>{goal.title}</h3>

      <p>{goal.description}</p>

      <p>
        {goal.currentProgress} / {goal.targetValue}
      </p>

      <div>
        <div
          style={{
            width: `${percentage}%`,
            height: "10px",
            background: "green",
          }}
        />
      </div>

      <button
        onClick={() =>
          onToggleComplete(goal.id)
        }
      >
        Complete
      </button>

      <button
        onClick={() => onEdit(goal)}
      >
        Edit
      </button>

      <button
        onClick={() =>
          onDelete(goal.id)
        }
      >
        Delete
      </button>
    </div>
  );
}
       
