import { useReducer, useState } from "react";
import GoalStats from './GoalStats';
import GoalFilter from "./GoalFilters";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import GoalFilters from "./GoalFilters";


const INITIAL_STATE = [];

const ACTION_TYPES = {
  INIT_GOALS: 'INIT_GOALS',
  ADD_GOAL: 'ADD_GOAL',
  EDIT_GOAL: 'EDIT_GOAL',
  DELETE_GOAL: 'DELETE_GOAL',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
};

export default function Goals() {
  const [goals, dispatch] = useReducer(goalsReducer, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  function goalsReducer(state, action){
    switch (action.type) {
      case ACTION_TYPES.INIT_GOALS: {
        return action.payload || [];
    }

      case ACTION_TYPES.ADD_GOAL: {
      const newGoal = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        category: action.payload.category || 'Study',
        targetValue: Number(action.payload.targetValue) || 100,
        currentProgress: Number(action.payload.currentProgress) || 0,
        deadline: action.payload.deadline || '',
        completed: action.payload.completed || false,
        createdAt: new Date().toISOString(),
      };
      // Auto-mark as completed if current progress >= target
      if (newGoal.currentProgress >= newGoal.targetValue) {
        newGoal.completed = true;
      }
      return [...state, newGoal];
    }

      case ACTION_TYPES.EDIT_GOAL: {
      return state.map((goal) => {
        if (goal.id === action.payload.id) {
          const updatedProgress = Number(action.payload.currentProgress);
          const updatedTarget = Number(action.payload.targetValue);
          const isCompleted = action.payload.completed || updatedProgress >= updatedTarget;
          
          return {
            ...goal,
            title: action.payload.title,
            description: action.payload.description,
            category: action.payload.category,
            targetValue: updatedTarget,
            currentProgress: updatedProgress,
            deadline: action.payload.deadline,
            completed: isCompleted,
          };
        }
        return goal;
      });
    }


       case ACTION_TYPES.DELETE_GOAL: {
      return state.filter((goal) => goal.id !== action.payload);
    }

    case ACTION_TYPES.TOGGLE_COMPLETE: {
      return state.map((goal) => {
        if (goal.id === action.payload) {
          const isCurrentlyCompleted = goal.completed;
          return {
            ...goal,
            completed: !isCurrentlyCompleted,
            // If marking as complete, set progress to target value. If unmarking, keep progress as is (or can reset to 0 if it was maxed)
            currentProgress: !isCurrentlyCompleted 
              ? goal.targetValue 
              : (goal.currentProgress >= goal.targetValue ? 0 : goal.currentProgress),
          };
        }
        return goal;
      });
    }


      case ACTION_TYPES.UPDATE_PROGRESS: {
      return state.map((goal) => {
        if (goal.id === action.payload.id) {
          const newProgress = Math.min(
            Math.max(0, Number(action.payload.progress)),
            goal.targetValue
          );
          const isCompleted = newProgress >= goal.targetValue ? true : goal.completed;
          return {
            ...goal,
            currentProgress: newProgress,
            completed: isCompleted,
          };
        }
        return goal;
      });
    }

    default: return state;
  }
  }

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
    <div className="goals-module">
    <div>
      <GoalStats goals={goals} />

      <GoalFilters
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
    </div>
  );
}