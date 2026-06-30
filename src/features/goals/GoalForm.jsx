/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyGoal = {
  title: '',
  description: '',
  category: 'Study',
  targetValue: 1,
  currentProgress: 0,
  deadline: '',
  completed: false,
};

const GoalForm = ({ goal, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(emptyGoal);
  const [error, setError] = useState('');

  useEffect(() => {
    if (goal) {
      setFormData(goal);
      return;
    }

    const future = new Date();
    future.setDate(future.getDate() + 14);

    setFormData({
      ...emptyGoal,
      deadline: future.toISOString().split('T')[0],
    });
  }, [goal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim() || !formData.deadline) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.currentProgress > formData.targetValue) {
      setError('Current progress cannot be greater than target value.');
      return;
    }

    onSubmit({
      ...formData,
      id: goal ? goal.id : `g-${Date.now()}`,
      completed: formData.completed || formData.currentProgress >= formData.targetValue,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{goal ? 'Edit Goal' : 'Add Goal'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {error && <div className="modal-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Study">Study</option>
              <option value="Health">Health</option>
              <option value="Career">Career</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Target Value</label>
              <input
                className="form-input"
                type="number"
                min="1"
                name="targetValue"
                value={formData.targetValue}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Progress</label>
              <input
                className="form-input"
                type="number"
                min="0"
                name="currentProgress"
                value={formData.currentProgress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Deadline</label>
            <input
              className="form-input"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <label className="form-checkbox-group">
            <input
              className="form-checkbox"
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <span className="form-checkbox-label">Mark as completed</span>
          </label>

          <div className="form-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-submit">
              Save Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;