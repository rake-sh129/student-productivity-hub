import React, { useReducer } from 'react'
import GoalCard from './GoalCard';
import {GoalReducer, getInitialState, ACTIONS} from './GoalReducer';


const Goals = () => {
  const [goals, dispatch]= useReducer(null, getInitialState);

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
          <div></div>

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
      
    </div>
  )
}

export default Goals
