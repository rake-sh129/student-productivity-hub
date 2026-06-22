import { useReducer, useState } from "react";
import GoalStats from './GoalStats';
import GoalFilter from "./GoalFilters";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";

export default function Goals() {
  const [goals, dispatch] = useReducer(goalsReducer, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_GOAL",
      payload: id,
    });
  };

  const handleToggleComplete = (id) => {
    dispatch({
      type: "TOGGLE_COMPLETE",
      payload: id,
    });
  };

  return (
    <div>
      <GoalsStats goals={goals} />

      <GoalsToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onEdit={(goal) => {
            setGoalToEdit(goal);
            setIsFormOpen(true);
          }}
        />
      ))}

      <GoalForm
        isOpen={isFormOpen}
        goalToEdit={goalToEdit}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}