function GoalFilters({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search goals..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
}


export default GoalFilters