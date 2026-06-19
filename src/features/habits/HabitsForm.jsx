import { useState } from "react";

const HabitForm = ({ dispatch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    dispatch({
      type: "ADD_HABIT",
      payload: text,
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter habit..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;