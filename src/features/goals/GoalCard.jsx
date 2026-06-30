import { useMemo, useState } from 'react';
import {
  Edit,
  Trash2,
  Check,
  Calendar,
  Plus,
  Minus,
  Award,
  BookOpen,
  Heart,
  Briefcase,
  User,
} from 'lucide-react';

const categoryMap = {
  Study: { icon: BookOpen, className: 'study' },
  Health: { icon: Heart, className: 'health' },
  Career: { icon: Briefcase, className: 'career' },
  Personal: { icon: User, className: 'personal' },
};

const GoalCard = ({ goal, onEdit, onDelete, onToggleComplete, onUpdateProgress }) => {
  const [isEditingExact, setIsEditingExact] = useState(false);
  const [exactValue, setExactValue] = useState(goal.currentProgress);

  const category = categoryMap[goal.category] || categoryMap.Study;
  const Icon = category.icon;
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = !goal.completed && goal.deadline < today;

  const percentage = useMemo(() => {
    if (!goal.targetValue) return 0;
    return Math.min(100, Math.round((goal.currentProgress / goal.targetValue) * 100));
  }, [goal.currentProgress, goal.targetValue]);

  const changeProgress = (amount) => {
    onUpdateProgress(goal.id, goal.currentProgress + amount);
  };

  const submitExactValue = (e) => {
    e.preventDefault();
    onUpdateProgress(goal.id, Number(exactValue));
    setIsEditingExact(false);
  };

  return (
    <div className={`goal-card ${goal.completed ? 'completed' : ''}`}>
      {goal.completed && (
        <div className="completed-award">
          <Award size={16} />
        </div>
      )}

      <div className="card-header">
        <div className={`category-badge ${category.className}`}>
          <Icon size={14} />
          <span>{goal.category}</span>
        </div>

        <div className="card-actions">
          <button className="action-btn" onClick={() => onEdit(goal)}>
            <Edit size={16} />
          </button>
          <button className="action-btn delete" onClick={() => onDelete(goal.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <h3 className={`goal-title ${goal.completed ? 'completed' : ''}`}>{goal.title}</h3>
        <p className="goal-description">{goal.description}</p>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-value-badge">
              {goal.currentProgress}/{goal.targetValue}
            </span>
          </div>

          <div className="progress-track">
            <div
              className={`progress-fill ${goal.completed ? 'completed' : category.className}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="progress-controls">
            <div className="adjust-buttons">
              <button className="adjust-btn" onClick={() => changeProgress(-1)}>
                <Minus size={14} />
              </button>
              <button className="adjust-btn" onClick={() => changeProgress(1)}>
                <Plus size={14} />
              </button>
            </div>

            {isEditingExact ? (
              <form className="exact-form" onSubmit={submitExactValue}>
                <input
                  className="exact-input"
                  type="number"
                  min="0"
                  max={goal.targetValue}
                  value={exactValue}
                  onChange={(e) => setExactValue(e.target.value)}
                />
                <button className="exact-submit-btn" type="submit">
                  Save
                </button>
              </form>
            ) : (
              <button className="set-units-btn" onClick={() => setIsEditingExact(true)}>
                Set exact
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className={`deadline-badge ${isOverdue ? 'overdue' : 'normal'}`}>
          <Calendar size={14} />
          <span>{goal.deadline}</span>
        </div>

        <button
          className={`btn-toggle-complete ${goal.completed ? 'completed' : 'active'}`}
          onClick={() => onToggleComplete(goal.id)}
        >
          <Check size={14} />
          <span>{goal.completed ? 'Completed' : 'Mark Complete'}</span>
        </button>
      </div>
    </div>
  );
};

export default GoalCard;