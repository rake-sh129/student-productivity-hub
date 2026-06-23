import React from 'react'

const ACTIONS = {
    ADD_GOAL: 'ADD_GOAL',
    EDIT_GOAL: 'EDIT_GOAL',
    DELETE_GOAL: 'DELETE_GOAL',
    UPDATE_PROGRESS: 'UPDATE_PROGRESS',
    TOGGLE_COMPLETE: 'TOGGLE_COMPLETE'
}

const getInitialState = ()=>{
    try{
        const saved = localStorage.getItem('');
        if(saved) return JSON.parse(saved);
    } catch(error){
        console.log('Storage parse failed:', error)
    }

    return [
        {
            id: 'g-3',
            title: 'Morning Cardio Run',
            description: 'Run 5 kilometers 4 times a week to improve stamina and focus.',
            category: 'Health',
            targetValue: 16,
            currentProgress: 8,
            deadline: '2026-06-30',
            completed: false
        },
        {
            id: 'g-1',
            title: 'Complete React Term Project',
            description: 'Build and deploy the Student Productivity Hub in React with localStorage state.',
            category: 'Study',
            targetValue: 100,
            currentProgress: 60,
            deadline: '2026-06-25',
            completed: false
        }
    ]
}

const GoalReducer = (state, action) => {
    let nextState;

    switch(action.type) {
        case ACTIONS.ADD_GOAL:
            nextState = [...state, action.payload];
            break;

        case ACTIONS.EDIT_GOAL:
            nextState = state.map(item=>
                item.id === action.payload.id? {...item, ...action.payload} : item
            );
            break;

        case ACTIONS.DELETE_GOAL:
            nextState = state.filter(item => item.id !== action.payload);
            break;

        case ACTIONS.UPDATE_PROGRESS:
            nextState = state.map(item =>{
                if(item.id === action.payload){
                    const newProgress = Math.max(0, Math.min(item.targetValue, Number(action.payload.progress)));
                    return {
                        ...item,
                        currentProgress: newProgress,
                        completed: newProgress >= item.targetValue
                    }
                } 
                return item;
            });
            break;

        case ACTIONS.TOGGLE_COMPLETE:
            nextState = state.map(item =>{
                if(item.id === action.payload){
                    const nextCompleted = !item.completed;
                    return {
                        ...item,
                        completed: nextCompleted,
                        currentProgress: nextCompleted ? item.targetValue : 0
                    }
                }
                return item;
            });
            break;

        default: return state;

    }
}

export {GoalReducer, getInitialState, ACTIONS}
