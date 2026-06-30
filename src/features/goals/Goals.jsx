import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import {
  addGoal,
  editGoal,
  deleteGoal,
  updateGoalProgress,
  toggleGoalComplete,
} from "../../Stores/goalsSlice";
import { Plus, Search, BarChart3, CheckCircle2, Clock3 } from "lucide-react";
import "./Goals.css";

const Goals = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.items);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const today = new Date().toISOString().split("T")[0];

  const stats = useMemo(() => {
    const total = goals.length;
    const completed = goals.filter((goal) => goal.completed).length;
    const active = total - completed;
    const overdue = goals.filter(
      (goal) => !goal.completed && goal.deadline && goal.deadline < today
    ).length;

    return { total, completed, active, overdue };
  }, [goals, today]);

  const filteredGoals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return goals.filter((goal) => {
      const matchesSearch =
        !query ||
        goal.title.toLowerCase().includes(query) ||
        goal.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && goal.completed) ||
        (statusFilter === "Active" && !goal.completed) ||
        (statusFilter === "Overdue" &&
          !goal.completed &&
          goal.deadline &&
          goal.deadline < today);

      const matchesCategory =
        categoryFilter === "All" || goal.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [goals, searchQuery, statusFilter, categoryFilter, today]);

  const openCreateForm = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  const openEditForm = (goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingGoal(null);
    setIsFormOpen(false);
  };

  const handleSaveGoal = (goalData) => {
    dispatch(editingGoal ? editGoal(goalData) : addGoal(goalData));
    closeForm();
  };

  const handleDeleteGoal = (id) => {
    dispatch(deleteGoal(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleGoalComplete(id));
  };

  const handleUpdateProgress = (id, progress) => {
    dispatch(updateGoalProgress({ id, progress }));
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <div className="header-title-wrapper">
          <div className="header-brand">
            <BarChart3 />
            <h1 className="header-title">Goals Tracker</h1>
          </div>
          <p className="header-subtitle">
            Track study, health, career, and personal goals in one place.
          </p>
        </div>

        <div className="header-actions">
          <button className="btn-primary" onClick={openCreateForm}>
            <Plus size={16} />
            Add Goal
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon-wrapper blue">
            <BarChart3 size={18} />
          </div>
          <div className="stats-info">
            <span className="stats-value">{stats.total}</span>
            <span className="stats-label">Total Goals</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon-wrapper emerald">
            <CheckCircle2 size={18} />
          </div>
          <div className="stats-info">
            <span className="stats-value">{stats.completed}</span>
            <span className="stats-label">Completed</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon-wrapper indigo">
            <Clock3 size={18} />
          </div>
          <div className="stats-info">
            <span className="stats-value">{stats.active}</span>
            <span className="stats-label">Active</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon-wrapper amber">
            <Clock3 size={18} />
          </div>
          <div className="stats-info">
            <span className="stats-value">{stats.overdue}</span>
            <span className="stats-label">Overdue</span>
          </div>
        </div>
      </div>

      <div className="filters-toolbar">
        <div className="status-tabs">
          {["All", "Active", "Completed", "Overdue"].map((status) => (
            <button
              key={status}
              className={`tab-btn ${statusFilter === status ? "active" : "inactive"}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="filter-inputs">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Search goals"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="category-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
            <option value="Career">Career</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>

      {filteredGoals.length > 0 ? (
        <div className="goals-grid">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={openEditForm}
              onDelete={handleDeleteGoal}
              onToggleComplete={handleToggleComplete}
              onUpdateProgress={handleUpdateProgress}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <h3 className="empty-state-title">No goals found</h3>
          <p className="empty-state-desc">
            Add a new goal or change the current filters.
          </p>
          <div className="empty-state-actions">
            <button className="btn-primary" onClick={openCreateForm}>
              <Plus size={16} />
              Add Goal
            </button>
          </div>
        </div>
      )}

      {isFormOpen && (
        <GoalForm
          goal={editingGoal}
          onSubmit={handleSaveGoal}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default Goals;