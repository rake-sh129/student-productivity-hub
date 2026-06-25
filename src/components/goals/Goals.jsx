import React, { useReducer, useState } from 'react'
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import {GoalReducer, getInitialState, ACTIONS} from './GoalReducer';
import { Plus, Search, BarChart, CheckCircle, Clock, Activity, Sparkles, Compass, GraduationCap} from 'lucide-react';


const Goals = () => {
  const [goals, dispatch]= useReducer(null, getInitialState);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const totalCount = goals.length;
  const completedCount = goals.filter(g=> g/completed).length;
  const activeCount = totalCount - completedCount;
  const successPercentage = totalCount > 0? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSaveGoal = (goalData) =>{
    if(editingGoal) {
      dispatch({type: ACTIONS.EDIT_GOAL, payload: goalData});
    } else{
      dispatch({type: ACTIONS.ADD_GOAL, payload: goalData});
    }
    setIsFormOpen(false);
    setEditingGoal(null);
  }

  return (
    <div>
      <header>
        <div>
          <div>
            <h1>Student Hub Goals</h1>
          </div>
          <p>Empower your learning journey. Formulate units, observe deadlines, and inspect active progress metrics.</p>
        </div>


        <div>
          <button>
            <span>Generate Spark</span>

          </button>

          <button>
            <span>New Goal</span>
          </button>
        </div>
      </header>

      <section>
        <div>
          <div></div>

          <div>
            <div></div>
            <div>Total Goals</div>
          </div>
        </div>

        <div>
          <div>
          </div>

          <div>
            <div></div>
            <div>Completed</div>
          </div>
        </div>


        <div>
          <div></div>

          <div>
            <div></div>
            <div>In Progress</div>
          </div>
        </div>
      </section>

      <section>
        {/* <GoalCard></GoalCard> */}
      </section>

      <div>
        <div></div>

        <h3>No tracked items found</h3>
        <p></p>

        <div></div>
      </div>

      {
        isFormOpen && (
          <GoalForm
          goal={editingGoal}
          onSubmit={handleSaveGoal}
          onClose={()=>{
            setIsFormOpen(false);
            setEditingGoal(null);
          }}/>
        )
      }
      
    </div>
  )
}

export default Goals
