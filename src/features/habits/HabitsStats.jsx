const HabitStats = ({ habits }) => {
    const totalHabits = habits.length;
  
    const completedHabits = habits.filter(
      (habit) => habit.completed
    ).length;
  
    const completionRate =
      totalHabits === 0
        ? 0
        : Math.round(
            (completedHabits / totalHabits) * 100
          );
  
    return (
      <div>
        <h2>Habit Statistics</h2>
  
        <p>Total Habits : {totalHabits}</p>
  
        <p>Completed Today : {completedHabits}</p>
  
        <p>Completion Rate : {completionRate}%</p>
      </div>
    );
  };
  
  export default HabitStats;