import React, { useReducer, useState } from 'react'
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import {GoalReducer, getInitialState, ACTIONS} from './GoalReducer';
import { Plus, Search, BarChart, CheckCircle, Clock, Activity, Sparkles, Compass, GraduationCap} from 'lucide-react';
import "./Goals.css";


const Goals = () => {
  const [goals, dispatch]= useReducer(GoalReducer, null, getInitialState);

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
    <div className='goals-container' id='student-goals-hub-container'>
      <header className="goals-header" id="goals-main-header">
        <div className="header-title-wrapper">
          <div className="header-brand" id="goals-header-brand">
            <GraduationCap/>
            <h1 className="header-title">Student Hub Goals</h1>
          </div>
          <p className="header-subtitle">Empower your learning journey. Formulate units, observe deadlines, and inspect active progress metrics.</p>
        </div>


        <div className="header-actions">
          <button type="button" className="btn-secondary" onClick={generateInspirationalGoal} id="btn-generate-spark">
            <Sparkles size={14} style={{ color: '#d97706' }} />
            <span>Generate Spark</span>
          </button>

          <button type="button" className="btn-primary" id="btn-new-goal" onClick={()=>{
            setEditingGoal(null);
            setIsFormOpen(true);
          }}>
            <Plus size={14} />
            <span>New Goal</span>
          </button>
        </div>
      </header>

      <section className="stats-grid" aria-label="Goals Summary Dashboard" id="goals-stats-dashboard">
        <div className="stats-card" id="stats-total-card">
          <div className="stats-icon-wrapper blue">
            <Activity size={18} />
          </div>

          <div className="stats-info">
            <div className="stats-value">{totalCount}</div>
            <div className="stats-label">Total Goals</div>
          </div>
        </div>

        <div className="stats-card" id="stats-completed-card">
          <div className="stats-icon-wrapper emerald">
            <CheckCircle size={18} />
          </div>

          <div className="stats-info">
            <div className="stats-value">{completedCount}</div>
            <div className="stats-label">Completed</div>
          </div>
        </div>


        <div className="stats-card" id="stats-progress-card">
          <div className="stats-icon-wrapper amber">
            <Clock size={18} />
          </div>

          <div className="stats-info">
            <div className="stats-value">{activeCount}</div>
            <div className="stats-label">In Progress</div>
          </div>
        </div>
      </section>

        <div className="filters-toolbar" id="goals-filters-toolbar">
          <div className="status-tabs" id="goals-status-tabs">
              {
                ['All', 'In Progress', 'Completed', 'Overdue'].map((tab)=>(
                  <button key={tab} type="button"
                  className={`tab-btn ${statusFilter === tab ? 'active' : 'inactive'}`}
                  onClick={()=> setStatusFilter(tab)}>
                    {tab}
                  </button>
                ))
              }
          </div>


          <div className="filter-inputs">
            <div className="search-wrapper">
              <Search size={13} className="search-icon" />
              <input type="text" className="search-input" placeholder='Search goals...' value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)} id="search-goals-input" />
              </div>

              <select className="category-select" value={selectedCategory} 
              onChange={(e)=> setSelectedCategory(e.target.value)} id="category-filter-select">
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
            <section className="goals-grid" id="goals-list-grid">
              {
                filteredGoals.map((g)=>{
                  return (
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
                  )
                })
              }
            </section>
          ): (
            <div className="empty-state-card" id="goals-empty-state">
              <div className="empty-state-icon">
                <Compass size={28} />
              </div>
              <h3  className="empty-state-title">No tracked items found</h3>
              <p className="empty-state-desc">
                {
                  goals.length === 0? "You haven't setup any study goals yet! Formulate your first milestone to get started.":
                  "No goals match the active filter criteria. Try adjusting keywords or resetting filters."}
              </p>
              <div className="empty-state-actions">
                {
                  goals.length > 0 && (
                    <button type="button" className="btn-secondary" id="btn-reset-filters" onClick={()=>{
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setStatusFilter('All');
                    }}>Reset Filters
                    </button>
                  )}

                  <button type="button" className="btn-primary" id="btn-empty-create-goal" onClick={()=>{
                    setEditingGoal(null);
                    setIsFormOpen(true);
                  }}> <Plus size={12} />
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