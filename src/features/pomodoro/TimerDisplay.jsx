

const TimerDisplay = ({timeLeft, radius, circumference, dashOffset,}) => {

    const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };


  return (
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
        {formatTime(timeLeft)}
      </div>

    </div>
  )
}

export default TimerDisplay
