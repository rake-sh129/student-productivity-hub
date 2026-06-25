import React, { useEffect, useState } from 'react'

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
    <div>
      <div>
        <div>
          <h2>{goal? 'Edit Goal': 'Create New Goal'}</h2>
          <button onClick={onClose}></button>
        </div>

        <form action="" onSubmit={handleSubmit}>
          {errorText && (
            <div>{errorText}</div>
          )}

          <div>
            <label>Title Goal</label>
            <input type="text" placeholder="e.g. Master React Hooks" value={title}
            onChange={(e)=> setTitle(e.target.value)} required />
          </div>

          <div>
            <label>Description / Target Outcome</label>
            <textarea placeholder="What are the next action guidelines?" rows={2} value={description}
            onChange={(e)=> setDescription(e.target.value)} required></textarea>
          </div>

          <div>
            <div>
            <label>Category</label>
            <select value={category}
            onChange={(e)=> setCatergory(e.target.value)}>
              <option value="Study">📚 Study / Academic</option>
              <option value="Health">🧘 Health & Wellness</option>
              <option value="Career">💼 Career Prep</option>
              <option value="Personal">🌱 Personal Development</option>
            </select>
            </div>

            <div>
              <label>Target Deadline</label>
              <input type="date" value={deadline}
              onChange={(e)=> setDeadline(e.target.value)} required />
            </div>
          </div>

          <div>
             <div>
               <label>Target Value (Goal Unit)</label>
               <input type="number" min={1} value={targetValue}
               onChange={(e)=> adjustTargetValue(e.target.value)} required />
             </div>

             <div>
               <label>Current Progress</label>
               <input type="number" min={0} value={currentProgress}
               onChange={(e)=> adjustProgressValue(e.target.value)} />
             </div>
          </div>

          <div>
             <input type="checkbox" id="goal-form-completed-checkbox" checked={completed}
             onChange={(e)=> adjustCompletedCheck(e.target.checked)} />
             <label htmlFor="goal-form-completed-checkbox">Mark this goal as fully completed immediately</label>
          </div>

          <div>
             <button type="button" onClick={onClose}>Cancel</button>
             <button type="submit">{goal? 'Update Goal': 'Create Goal'}</button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default GoalForm
