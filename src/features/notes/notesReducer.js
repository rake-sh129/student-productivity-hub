export const initialState = [];

export function notesReducer(state, action) {
    switch(action.type){
        case 'SET_NOTES':{
            return action.payload;
        }

        case 'ADD_NOTES':{
            return [...state, action.payload];
        }

        case 'DELETE_NOTES':{
            return state.filter(note => note.id !== action.payload);
        }

        case 'UPDATE_NOTES':{
            return state.map(note => {
                note.id === action.payload.id ? {...note, ...action.payload.data}:note
            })
        }
        default:{
            return state;
        }
    }
}