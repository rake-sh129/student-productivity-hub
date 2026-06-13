import { useReducer, useState } from "react";
import { taskReducer } from "./taskReducer";
import { nanoid } from "nanoid";

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
    <div>
      <h2>Task Manager</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Task"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {task.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;