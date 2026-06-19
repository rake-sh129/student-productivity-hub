import { useReducer, useEffect } from "react";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import ModeSelector from "./ModeSelector";
import "./Pomodoro.css";

const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const ACTIONS = {
  START: "START",
  PAUSE: "PAUSE",
  RESET: "RESET",
  CHANGE_MODE: "CHANGE_MODE",
  TICK: "TICK",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return { ...state, isRunning: true };

    case ACTIONS.PAUSE:
      return { ...state, isRunning: false };

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

    case ACTIONS.TICK:
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    default:
      return state;
  }
}

const initialState = {
  mode: "focus",
  timeLeft: MODES.focus,
  isRunning: false,
  sessionsCompleted: 0,
  focusMinutes: 0,
};

export default function Pomodoro() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({
        type: ACTIONS.TICK,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  const progress =
    state.timeLeft / MODES[state.mode];

  const dashOffset =
    circumference - progress * circumference;

  return (
    <div className="pomodoro-page">
      <div className="pomodoro-card">

        <TimerDisplay
          timeLeft={state.timeLeft}
          radius={radius}
          circumference={circumference}
          dashOffset={dashOffset}
        />

        <TimerControls
          isRunning={state.isRunning}
          onStart={() =>
            dispatch({ type: ACTIONS.START })
          }
          onPause={() =>
            dispatch({ type: ACTIONS.PAUSE })
          }
          onReset={() =>
            dispatch({ type: ACTIONS.RESET })
          }
        />

        <ModeSelector
          currentMode={state.mode}
          changeMode={(mode) =>
            dispatch({type: ACTIONS.CHANGE_MODE,
             payload: mode,})
  }
/>

      </div>

      
    </div>
  );
}
