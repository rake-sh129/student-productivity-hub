import React, { useReducer, useState } from 'react'
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import {GoalReducer, getInitialState, ACTIONS} from './GoalReducer';
import { Plus, Search, BarChart, CheckCircle, Clock, Activity, Sparkles, Compass, GraduationCap} from 'lucide-react';


const Goals = () => {
  const [goals, dispatch]= useReducer(null, getInitialState);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const totalCount = goals.length;
  const completedCount = goals.filter(g => g.completed).length;
  const activeCount = totalCount - completedCount;
  const successPercentage = totalCount > 0? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredGoals = goals.filter(goal => {
    const query = searchQuery.toLocaleLowerCase();
    const matchesSearch = goal.title.toLowerCase().includes(query) || goal.description.toLowerCase().includes(query);
    const matchesCat = selectedCategory === 'All' || goal.category === selectedCategory;


    let matchesStatus = true;
    if(statusFilter === 'In Progress'){
      matchesStatus = !goal.completed;
    } else if(statusFilter === 'Completed'){
      matchesStatus = goal.completed;
    } else if(statusFilter === 'Overdue'){
      const isOverdue = !goal.completed && goal.deadline && new Date(goal.deadline) < new Date('2026-06-30');
      matchesStatus = !!isOverdue;
    }

    return matchesCat && matchesSearch && matchesStatus;

  })

  const handleSaveGoal = (goalData) =>{
    if(editingGoal) {
      dispatch({type: ACTIONS.EDIT_GOAL, payload: goalData});
    } else{
      dispatch({type: ACTIONS.ADD_GOAL, payload: goalData});
    }
    setIsFormOpen(false);
    setEditingGoal(null);
  }

  const generateInspirationalGoal = ()=>{
    const list = [
      {
        title: 'Drink 8 Cups Daily',
        description: 'Track healthy water intake habits to boost mental clarity and study focus.',
        category: 'Health',
        targetValue: 10,
        currentProgress: 3,
        deadline: '2026-06-30',
      },
      {
        title: 'Revise 50 Flashcards',
        description: 'Complete vocabulary prep using spaced repetition in Anki.',
        category: 'Study',
        targetValue: 50,
        currentProgress: 15,
        deadline: '2026-06-30',
      }
    ]

    const chosen = list[Math.floor(Math.random() * list.length)];
    dispatch({
      type: ACTIONS.ADD_GOAL,
      payload: { ...chosen, id: `g-gen-${Date.now()}`, completed: false }
    })
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
          <button type="button" onClick={generateInspirationalGoal}>
            <span>Generate Spark</span>

          </button>

          <button type="button" onClick={()=>{
            setEditingGoal(null);
            setIsFormOpen(true);
          }}>
            <span>New Goal</span>
          </button>
        </div>
      </header>

      <section>
        <div>
          <div></div>

          <div>
            <div>{totalCount}</div>
            <div>Total Goals</div>
          </div>
        </div>

        <div>
          <div>
          </div>

          <div>
            <div>{completedCount}</div>
            <div>Completed</div>
          </div>
        </div>


        <div>
          <div></div>

          <div>
            <div>{activeCount}</div>
            <div>In Progress</div>
          </div>
        </div>
      </section>

        <div>
          <button key={tab} type="button" onClick={()=> setStatusFilter(tab)}>{tab}</button>
        </div>


        <div>
          <div>
              <input type="text" placeholder='Search goals...' value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)} />

              <select value={selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)}>
                 <option value="All">All Categories</option>
                 <option value="Study">📚 Academic Tracks</option>
                 <option value="Health">🧘 Physical Wellness</option>
                 <option value="Career">💼 Career Prep</option>
                 <option value="Personal">🌱 Personal Development</option>
              </select>
          </div>
        </div>

         {
          filteredGoals.length > 0 ?(
            <section>
              {
                filteredGoals.map((g)=>{
                  <GoalCard key={g.id}
                  goal={g}
                  onEdit={(goalToEdit) =>{
                    setEditingGoal(goalToEdit);
                    setIsFormOpen(true)
                  }}
                  onDelete={(id) => dispatch({type: ACTIONS.DELETE_GOAL, payload: id})}
                  onToggleComplete={(id) => dispatch({type: ACTIONS.TOGGLE_COMPLETE, payload: id})}
                  onUpdateProgress={(id, progress) => dispatch({type: ACTIONS.UPDATE_PROGRESS, payload: {id, progress}})}>

                  </GoalCard>
                })
              }
            </section>
          ): (
            <div>
              <h3>No tracked items found</h3>
              <p>
                {
                  goals.length === 0? "You haven't setup any study goals yet! Formulate your first milestone to get started.":
                  "No goals match the active filter criteria. Try adjusting keywords or resetting filters."}
              </p>
              <div>
                {
                  goals.length > 0 && (
                    <button type="button" onClick={()=>{
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setStatusFilter('All');
                    }}>Reset Filters
                    </button>
                  )}

                  <button type="button" onClick={()=>{
                    setEditingGoal(null);
                    setIsFormOpen(true);
                  }}>
                    <span>Create Goal</span>
                  </button>
              </div>
              </div>
          )
         }
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
