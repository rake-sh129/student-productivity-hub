import React, { useState } from 'react'

const GoalFilters = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All')

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
  return (
    <div>
      <div>
        <button type="button" onClick={()=>{
          setStatusFilter()
        }}>

        </button>
      </div>
      
    </div>
  )
}

export default GoalFilters
