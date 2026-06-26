import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const GoalForm = ({goal, onSubmit, onClose}) => {

  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[category, setCatergory] = useState('Study');
  const[targetValue, setTargetValue] = useState(10);
  const[currentProgress, setCurrentProgress] = useState(0);
  const[deadline, setDeadline] = useState('');
  const[completed, setCompleted] = useState(false);
  const[errorText, setErrorText] = useState('');

  useEffect(()=>{
    if(goal){
      setTitle(goal.title || '');
      setDescription(goal.description || '');
      setCatergory(goal.category || 'Study');
      setTargetValue(goal.targetValue || 10);
      setCurrentProgress(goal.currentProgress || 0);
      setDeadline(goal.deadline || '')
      setCompleted(goal.complete || false);
    } else{
      setTitle('');
      setDescription('');
      setCatergory('Study');
      setTargetValue(10);
      setCurrentProgress(0);

      const future = new Date();
      future.setDate(future.getDate() + 14);
      setDeadline(future.toISOString().split('T')[0]);
      setCompleted(false);
    }

    setErrorText('');
  }, [goal])

  const adjustProgressValue = (inputNum) =>{
    const val = Math.max(0, Number(inputNum));
    setCurrentProgress(val);
    setCompleted(val >= targetValue);
  }

  const adjustTargetValue = (inputNum) =>{
    const val = Math.max(1, Number(inputNum));
    setTargetValue(val);
    setCompleted(currentProgress >= val);
  }

  const adjustCompletedCheck = (checked) =>{
    setCompleted(checked);
    if(checked){
      setCurrentProgress(targetValue);
    } else if(currentProgress >= targetValue) {
      setCurrentProgress(Math.max(0, targetValue - 1));
    }
  };


  const handleSubmit = (e)=>{
    e.preventDefault();
    setErrorText('');

    if(!title.trim() || !description.trim() || !deadline){
      setErrorText('Please fill out all required fields.');
      return;
    }

    if(currentProgress > targetValue){
      setErrorText('Current progress cannot exceed the total amount.');
      return;
    }

    onSubmit({
      id: goal ? goal.id : `g-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      targetValue: Number(targetValue),
      currentProgress: Number(currentProgress),
      deadline,
      completed: completed || (Number(currentProgress) >= Number(targetValue))
    })
  }


  return (
    <div className="modal-overlay" onClick={onClose} id="goal-form-modal-overlay">
      <div className="modal-container" onClick={(e)=> e.stopPropagation()}
        id="goal-form-modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{goal? 'Edit Goal': 'Create New Goal'}</h2>
          <button type="button" className="modal-close-btn" onClick={onClose} id="btn-close-modal"> <X size={16} /> </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body" id="goal-form">
          {errorText && (
            <div className="modal-error" id="form-error-msg">{errorText}</div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="form-title-input">Title Goal</label>
            <input type="text" className="form-input" id="form-title-input"
             placeholder="e.g. Master React Hooks" value={title}
            onChange={(e)=> setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="form-desc-input">Description / Target Outcome</label>
            <textarea 
            className="form-textarea" id="form-desc-input"
            placeholder="What are the next action guidelines?" rows={2} value={description}
            onChange={(e)=> setDescription(e.target.value)} required></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
            <label className="form-label" htmlFor="form-category-select">Category</label>
            <select 
            className="form-select" id="form-category-select"
            value={category}
            onChange={(e)=> setCatergory(e.target.value)}>
              <option value="Study">📚 Study / Academic</option>
              <option value="Health">🧘 Health & Wellness</option>
              <option value="Career">💼 Career Prep</option>
              <option value="Personal">🌱 Personal Development</option>
            </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="form-deadline-input">Target Deadline</label>
              <input type="date" value={deadline}
              className="form-input" id="form-deadline-input"
              onChange={(e)=> setDeadline(e.target.value)} required />
            </div>
          </div>

          <div className="form-row">
             <div className="form-group">
               <label className="form-label" htmlFor="form-target-input">Target Value (Goal Unit)</label>
               <input 
                className="form-input" id="form-target-input"
               type="number" min={1} value={targetValue}
               onChange={(e)=> adjustTargetValue(e.target.value)} required />
             </div>

             <div className="form-group">
               <label className="form-label" htmlFor="form-progress-input">Current Progress</label>
               <input 
               className="form-input" id="form-progress-input"
               type="number" min={0} value={currentProgress}
               onChange={(e)=> adjustProgressValue(e.target.value)} />
             </div>
          </div>

          <div className="form-checkbox-group" 
            onClick={() => adjustCompletedCheck(!completed)}
            id="form-checkbox-group-container">
             <input type="checkbox" id="goal-form-completed-checkbox" className="form-checkbox"
             checked={completed}
             onChange={(e)=> adjustCompletedCheck(e.target.checked)}
             onClick={(e)=> e.stopPropagation()} />
             <label htmlFor="goal-form-completed-checkbox"
             className="form-checkbox-label"
             onClick={(e)=> e.stopPropagation()}>Mark this goal as fully completed immediately</label>
          </div>

          <div className="form-footer">
             <button className="btn-modal-cancel" id="btn-cancel-form"
             type="button" onClick={onClose}>Cancel</button>
             <button type="submit" className="btn-modal-submit" id="btn-submit-form">
              {goal? 'Update Goal': 'Create Goal'}
              </button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default GoalForm
