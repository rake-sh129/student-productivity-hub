import React, { useState } from 'react'
import {Edit, Trash2, Check, Calendar, Plus, Minus, Award, BookOpen, Heart, Briefcase, User, AlertTriangle, RotateCcw} from 'lucide-react';


const CATERGORY_THEMES = {
  Study: {
    themeClass: 'study',
    icon: BookOpen
  },
  Health: {
    themeClass: 'health',
    icon: Heart
  },
  Career: {
    themeClass: 'career',
    icon: Briefcase
  },
  Personal: {
    themeClass: 'personal',
    icon: User
  }
}

const GoalCard = ({goal, onEdit, onDelete, onToggleComplete, onUpdateProgress}) => {

  const {id, title, description, category, targetValue, currentProgress, deadline, completed} = goal;

  const [exactProgress, setExactProgress] = useState(currentProgress);
  const [isEditingExact, setIsEditingExact] = useState(false);

  const percentage = targetValue > 0 ? Math.round((currentProgress / targetValue) * 100) : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  const theme = CATERGORY_THEMES[category] || {
    themeClass: 'study',
    icon: User
  };
  const CategoryIcon = theme.icon;

  const isOverdue = !completed && deadline && new Date(deadline) < new Date('2026-06-30');

  const adjustProgress = (amount)=>{
    const next =  Math.max(0, Math.min(targetValue, currentProgress + amount));
    onUpdateProgress(id, next);
    setExactProgress(next);
  };

  const handleSaveExactProgress = (e)=>{
    e.preventDefault();
    const parsed = Number(exactProgress);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= targetValue) {
      onUpdateProgress(id, parsed);
      setIsEditingExact(false);
    } else {
      setExactProgress(currentProgress);
      setIsEditingExact(false);
    }
  }

  return (
    <div
      className={`goal-card ${completed ? 'completed' : 'active'}`}
      id={`goal-card-${id}`}>
        {
          completed && (
            <div className="completed-award" id={`goal-completed-award-${id}`}> <Award size={16} /> </div>
          )}

      <div className="card-header">
        <span className={`category-badge ${theme.themeClass}`} id={`goal-badge-${id}`}>
          <CategoryIcon size={12} />{category}</span>
      </div>

      <div className="card-actions">
        <button type="button" className="action-btn" id={`btn-edit-${id}`}
         onClick={()=> onEdit(goal)}
          title="Edit Goal"
          ><Edit size={14} /></button>
        <button type="button" className="action-btn delete" id={`btn-delete-${id}`}
         onClick={()=>{
          if(window.confirm(`Delete the goal "${title}"?`)){
            onDelete(id);
          }
          title= "Delete Goal"
        }}><Trash2 size={14} /></button>
      </div>


      <div className="card-content">
        <h3 className={`goal-title ${completed ? 'completed' : ''}`} id={`goal-title-text-${id}`}>
        {title}</h3>
        <p className="goal-description" id={`goal-desc-text-${id}`}>{description}</p>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Progress</span>
          <span className="progress-value-badge" id={`goal-progress-badge-${id}`}>
            {/* {currentProgress} / {targetValue} ({clampedPercentage}%) */}
          </span>
        </div>

        <div className="progress-track">
          <div
            className={`progress-fill ${completed ? 'completed' : theme.themeClass}`}
            style={{ width: `${clampedPercentage}%` }}
            id={`goal-progress-fill-${id}`}>

            </div>

            {
              completed && (
                <div className="progress-controls">
                   <div className="adjust-buttons">
                    <button className="adjust-btn" id={`btn-decrease-${id}`}
                    type="button" title="Decrease" onClick={() => adjustProgress(-1)}>
                      <Minus size={11} />
                    </button>

                    <button className="adjust-btn" id={`btn-increase-${id}`}
                      type="button" title="Increase" onClick={() => adjustProgress(1)}
                      >
                        <Plus size={11} />
                    </button>
                    </div>

                    {
                      isEditingExact ? (
                        <button className="set-units-btn" id={`btn-set-units-${id}`}
                        type="button"
                        onClick={() => {
                          setExactProgress(currentProgress)
                          setIsEditingExact(true);
                        }} > Set Units
                        </button>
                      ) : (
                        <form className="exact-input" id={`exact-input-${id}`}
                          onSubmit={handleSaveExactProgress} className="exact-form" id={`exact-form-${id}`}>
                            <input type="number" min={0} max={targetValue} value={exactProgress}
                            onChange={(e) => setExactProgress(Math.max(0, Math.min(targetValue, Number(e.target.value))))}
                            autoFocus
                             />
                             <button className="exact-submit-btn" id={`btn-exact-submit-${id}`}
                             type="submit">
                              Ok
                             </button>
                        </form>
                      )}
                      </div>
              )}
              </div>

              <div className="card-footer">
                 <div className={`deadline-badge ${isOverdue ? 'overdue' : 'normal'}`} id={`goal-deadline-${id}`}>
                  {isOverdue ? <AlertTriangle size={12} /> : <Calendar size={12} />}
                  <span>
                    {isOverdue ? 'Overdue:' : 'Due:'}
                    {deadline ? new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : 'No Date'}
                  </span>

                  <button className={`btn-toggle-complete ${completed ? 'completed' : 'active'}`} id={`btn-toggle-complete-${id}`}
                    type="button" onClick={()=> onToggleComplete(id)}>
                      {completed ? (
                    <>
              <RotateCcw size={12} />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Check size={12} />
              <span>Complete</span>
            </>
          )}
                  </button>

                 </div>
              </div>

              </div>
              </div>
              )
            }

export default GoalCard
