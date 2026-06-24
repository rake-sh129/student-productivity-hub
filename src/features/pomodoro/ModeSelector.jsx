

const ModeSelector = ({currentMode, changeMode}) => {
  return (
    <div className="mode-buttons">
      <button
        className={
          currentMode === "focus"
            ? "active"
            : ""
        }
        onClick={() =>
          changeMode("focus")
        }
      >
        Focus
      </button>

      <button
        className={
          currentMode === "shortBreak"
            ? "active"
            : ""
        }
        onClick={() =>
          changeMode("shortBreak")
        }
      >
        Short Break
      </button>

      <button
        className={
          currentMode === "longBreak"
            ? "active"
            : ""
        }
        onClick={() =>
          changeMode("longBreak")
        }
      >
        Long Break
      </button>
    </div>
  )
}

export default ModeSelector
