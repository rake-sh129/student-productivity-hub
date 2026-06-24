


const TimerControls = ({ isRunning, onStart, onPause, onReset,}) => {
  return (
        <div className="controls">

      <button
        className="reset-btn"
        onClick={onReset}
      >
        ↺
      </button>

      <button
        className="main-btn"
        onClick={
          isRunning
            ? onPause
            : onStart
        }
      >
        {isRunning ? "❚❚" : "▶"}
      </button>

     </div>

  )
}

export default TimerControls
