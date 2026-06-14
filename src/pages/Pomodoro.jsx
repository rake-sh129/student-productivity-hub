import { useReducer, useEffect } from "react";
import "./Pomodoro.css";

const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const ACTIONS = {
  START: "START",
  PAUSE: "PAUSE",
  TICK: "TICK",
  RESET: "RESET",
  CHANGE_MODE: "CHANGE_MODE",
};

const getInitialState = () => {
  return {
    mode: localStorage.getItem("mode") || "focus",
    timeLeft: Number(localStorage.getItem("timeLeft")) || MODES.focus,
    isRunning: false,
    sessionsCompleted:
      Number(localStorage.getItem("sessionsCompleted")) || 0,
    focusMinutes:
      Number(localStorage.getItem("focusMinutes")) || 0,
  };
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...state,
        isRunning: true,
      };

    case ACTIONS.PAUSE:
      return {
        ...state,
        isRunning: false,
      };

    case ACTIONS.RESET:
      return {
        ...state,
        isRunning: false,
        timeLeft: MODES[state.mode],
      };

    case ACTIONS.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
        timeLeft: MODES[action.payload],
        isRunning: false,
      };

    case ACTIONS.TICK: {
      if (state.timeLeft <= 1) {
        if (state.mode === "focus") {
          const newSessions =
            state.sessionsCompleted + 1;

          return {
            ...state,
            mode:
              newSessions % 4 === 0
                ? "longBreak"
                : "shortBreak",
            timeLeft:
              newSessions % 4 === 0
                ? MODES.longBreak
                : MODES.shortBreak,
            isRunning: false,
            sessionsCompleted: newSessions,
            focusMinutes:
              state.focusMinutes + 25,
          };
        }

        return {
          ...state,
          mode: "focus",
          timeLeft: MODES.focus,
          isRunning: false,
        };
      }

      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };
    }

    default:
      return state;
  }
}

export default function Pomodoro() {
  const [state, dispatch] = useReducer(
    reducer,
    null,
    getInitialState
  );

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: ACTIONS.TICK });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning]);

  useEffect(() => {
    localStorage.setItem("mode", state.mode);
    localStorage.setItem("timeLeft", state.timeLeft);
    localStorage.setItem(
      "sessionsCompleted",
      state.sessionsCompleted
    );
    localStorage.setItem(
      "focusMinutes",
      state.focusMinutes
    );
  }, [state]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  const progress =
    state.timeLeft / MODES[state.mode];

  const dashOffset =
    circumference - progress * circumference;


    return (
  <div className="pomodoro-page">
    <div className="pomodoro-card">

      <h2 className="pomodoro-title">
        Pomodoro Timer
      </h2>

      <div className="mode-buttons">
        <button
          className={state.mode === "focus" ? "active" : ""}
          onClick={() =>
            dispatch({
              type: ACTIONS.CHANGE_MODE,
              payload: "focus",
            })
          }
        >
          Focus
        </button>

        <button
          className={
            state.mode === "shortBreak"
              ? "active"
              : ""
          }
          onClick={() =>
            dispatch({
              type: ACTIONS.CHANGE_MODE,
              payload: "shortBreak",
            })
          }
        >
          Short Break
        </button>

        <button
          className={
            state.mode === "longBreak"
              ? "active"
              : ""
          }
          onClick={() =>
            dispatch({
              type: ACTIONS.CHANGE_MODE,
              payload: "longBreak",
            })
          }
        >
          Long Break
        </button>
      </div>

      <div className="timer-container">

        <svg
          className="timer-svg"
          width="280"
          height="280"
        >
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="#4f46e5"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="timer-text">
          {formatTime(state.timeLeft)}
        </div>

      </div>

      <div className="controls">

        <button
          className="reset-btn"
          onClick={() =>
            dispatch({ type: ACTIONS.RESET })
          }
        >
          ↺
        </button>

        <button
          className="main-btn"
          onClick={() =>
            dispatch({
              type: state.isRunning
                ? ACTIONS.PAUSE
                : ACTIONS.START,
            })
          }
        >
          {state.isRunning ? "❚❚" : "▶"}
        </button>

      </div>

      <div className="stats">
        <p>
          Sessions Completed:
          <strong>
            {" "}
            {state.sessionsCompleted}
          </strong>
        </p>

        <p>
          Total Focus Time:
          <strong>
            {" "}
            {state.focusMinutes} mins
          </strong>
        </p>
      </div>

      <div className="session-dots">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={
              item <=
              (state.sessionsCompleted % 4)
                ? "dot completed"
                : "dot"
            }
          />
        ))}
      </div>

    </div>
  </div>
);
}