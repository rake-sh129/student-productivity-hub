const WeeklyTracker = ({ habit }) => {
    if (!habit) return null;
  
    const getCurrentWeek = () => {
      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  
      return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return date.toISOString().split("T")[0];
      });
    };
  
    const weekDates = getCurrentWeek();
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  
    return (
      <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
        {weekDates.map((date, index) => {
          const completed = habit.completedDates?.includes(date) ?? false;
  
          return (
            <div key={date} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px" }}>{completed ? "✅" : "⬜"}</div>
              <small>{weekDays[index]}</small>
            </div>
          );
        })}
      </div>
    );
  };

  export default WeeklyTracker