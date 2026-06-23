import React, { useState } from 'react'


const CATERGORY_THEMES = {
  Study: {},
  Health: {},
  Career: {},
  Personal: {}
}



const GoalCard = () => {

  const {id, title, description, category, targetValue, currentProgress, deadline, completed} = goal;

  const [exactProgress, setExactProgress] = useState(currentProgress);
  const [isEditingExact, setIsEditingExact] = useState(false);

  const percentage = targetValue > 0 ? Math.round((currentProgress / targetValue) * 100) : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));


  const isOverdue = !completed && deadline && new Date(deadline) < new Date();

  const adjustProgress = (amount)=>{
    const next =  Math.max(0, Math.min(targetValue, currentProgress + amount));
    onUpdateProgress(id, next);
    setExactProgress(next);
  }

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
    <div>

      <div>
        <span></span>
      </div>

      <div>
        <button onClick={()=> onEdit(goal)}
          title="Edit Goal"
          >Edit Goal</button>
        <button onClick={()=>{
          if(window.confirm(`Delete the goal "${title}"?`)){
            onDelete(id);
          }
          title= "Delete Goal"
        }}>Delete Goal</button>
      </div>

      <div>
        <h3>Title</h3>
        <p>Description</p>
      </div>

      <div>
        <div>
          <span></span>
          <span></span>
        </div>

        <div>
          <div></div>

          <form action="">
            <input type="text" />
            <button>Ok</button>
          </form>
        </div>
      </div>

      <button></button>
      
    </div>
  )
}

export default GoalCard

       
