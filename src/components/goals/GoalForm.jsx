import { useState } from "react";

export default function GoalForm({isOpen, onClose,}) {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(title);

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button type="submit">
        Save Goal
      </button>
    </form>
  );
}