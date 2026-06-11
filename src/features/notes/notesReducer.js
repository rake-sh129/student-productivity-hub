export const initialState = {
    notes: [],
  };
  
  export function notesReducer(state, action) {
    switch (action.type) {
      case "SET_NOTES": {
        return {
          ...state,
          notes: action.payload,
        };
      }
  
      case "ADD_NOTES": {
        return {
          ...state,
          notes: [...state.notes, action.payload],
        };
      }
  
      case "DELETE_NOTES": {
        return {
          ...state,
          notes: state.notes.filter(
            (note) => note.id !== action.payload
          ),
        };
      }
  
      case "UPDATE_NOTES": {
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload.id
              ? { ...note, ...action.payload.data }
              : note
          ),
        };
      }
  
      default:
        return state;
    }
  }