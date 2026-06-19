import { useReducer, useState } from "react";
import { taskReducer } from "./taskReducer";
import { nanoid } from "nanoid";
import '../../styles/taskManager.css'

const TaskManager = () => {
  const [task, dispatch] = useReducer(taskReducer, []);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: nanoid(),
        text: input,
      },
    });

    setInput(""); // optional cleanup
  };

  const deleteTask = (id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  const toggleTask = (id) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
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
        <button onClick={addTask}>Add</button>
      </div>
  
      <ul className="task-list">
        {task.map((task) => (
          <li className="task-item" key={task.id}>
            <span
              className={`task-text ${task.completed ? "completed" : ""}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
  
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;