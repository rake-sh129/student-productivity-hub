import GoalCard from "./GoalCard";

function GoalList({goals, onEdit, onDelete, onToggleComplete, onUpdateProgress,}) {
  return (
    <div className="goals-grid">

      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onUpdateProgress={onUpdateProgress}
        />
      ))}

    </div>
  );
}

export default GoalList;