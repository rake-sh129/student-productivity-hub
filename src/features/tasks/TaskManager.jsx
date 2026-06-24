import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, toggleTask } from "../../stores/tasksSlice";
import "../../styles/taskManager.css";

const TaskManager = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch(addTask(input));
    setInput("");
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      <div className="task-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-item" key={task.id}>
            <span
              className={`task-text ${task.completed ? "completed" : ""}`}
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.text}
            </span>

            <button
              className="delete-btn"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
