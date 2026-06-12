import { useState } from "react";

function Pomodoro() {

  const ACTIONS = {
    TICK: 'TICK',
    START: 'START',
    PAUSE: 'PAUSE',
    RESET: 'RESET',
    SKIP: 'SKIP',
    CHANGE_MODE: 'CHANGE_MODE',
  }

  const [focusLength, setFocusLength] = useState();
  const [shortBreak, setShortBreak] = useState();
  const [longBreak, setLongBreak] = useState()
    return (
      <div>
        <h1>Pomodoro Timer</h1>
            <div id="pomodoro_timer_panel" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-20">
              </div>

                    <div id="mode_selectors" className="flex items-center justify-center p-1.5 bg-slate-50 rounded-2xl mb-8 border border-slate-200">


              <button onClick={()=>{
                console.log(ACTIONS.PAUSE)
              }}>Study Focus</button>

              <button>Short Break</button>

              <button>Long Break</button>

              </div>


      </div>
    );
  }
  
  export default Pomodoro;