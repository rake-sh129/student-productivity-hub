export const initialState = {
    habits: [],
  };
  
  const today = () => new Date().toISOString().split("T")[0];
  
  export const habitsReducer = (state, action) => {
    switch (action.type) {
      case "ADD_HABIT":
        return {
          ...state,
          habits: [
            ...state.habits,
            {
              id: Date.now(),
              title: action.payload,
              streak: 0,
              completedDates: [],
            },
          ],
        };
  
      case "DELETE_HABIT":
        return {
          ...state,
          habits: state.habits.filter(
            (habit) => habit.id !== action.payload
          ),
        };
  
      case "TOGGLE_HABIT":
        return {
          ...state,
          habits: state.habits.map((habit) => {
            if (habit.id !== action.payload) return habit;
  
            const todayDate = today();
  
            const alreadyCompleted =
              habit.completedDates.includes(todayDate);
  
            if (alreadyCompleted) {
              return {
                ...habit,
                completedDates: habit.completedDates.filter(
                  (date) => date !== todayDate
                ),
              };
            }
  
            return {
              ...habit,
              completedDates: [
                ...habit.completedDates,
                todayDate,
              ],
            };
          }),
        };
  
      default:
        return state;
    }
  };