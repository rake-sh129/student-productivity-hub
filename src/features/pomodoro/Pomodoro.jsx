import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { start, pause, reset, changeMode, tick, MODES } from '../../Stores/pomodoroSlice';
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import ModeSelector from "./ModeSelector";
import "./Pomodoro.css";

export default function Pomodoro() {
  const state = useSelector((state) => state.pomodoro);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, dispatch]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = state.timeLeft / MODES[state.mode];
  const dashOffset = circumference - progress * circumference;

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
          onStart={() => dispatch(start())}
          onPause={() => dispatch(pause())}
          onReset={() => dispatch(reset())}
        />

        <ModeSelector
          currentMode={state.mode}
          changeMode={(mode) => dispatch(changeMode(mode))}
        />

      </div>
    </div>
  );
}
