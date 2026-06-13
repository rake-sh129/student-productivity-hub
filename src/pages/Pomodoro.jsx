import { useReducer, useState } from "react";


  const ACTIONS = {
    TICK: 'TICK',
    START: 'START',
    PAUSE: 'PAUSE',
    RESET: 'RESET',
    SKIP: 'SKIP',
    CHANGE_MODE: 'CHANGE_MODE',
  }

  const DEFAULT_SETTINGS = {
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  }

  // OFFLINE-FIRST STORAGE RETRIEVER
  const getInitialState = ()=>{
    try{
      const savedSettings = localStorage.getItem('pom_hub_settings');
      const savedHistory = localStorage.getItem('pom_hub_history');
      const savedSessions = localStorage.getItem('pom_hub_sessions_completed');

      const parsedSettings = savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;

      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      const parsedSessions = savedSessions ? parseInt(savedSessions, 10) : 0;

    return {
      mode: 'focus',
      timeLeft: duration,
      duration: duration,
      isRunning: false,
      sessionsCompleted: parsedSessions,
      settings: parsedSettings,
      history: parsedHistory,
    };
  } catch(err){
    console.error("Local storage load exception, defaulted to standard guidelines:", err);
    return {
      mode: 'focus',
      timeLeft: 1500,
      duration: 1500,
      isRunning: false,
      sessionsCompleted: 0,
      settings: DEFAULT_SETTINGS,
      history: [],
      customNote: ''
    }
  }

  }

function pomodoroReducer(state, action) {
     

      const saveToStorage = (key, value)=>{
        try{
          localStorage.setItem(key, JSON.stringify(value));

        } catch (e){
          console.warn("Storage write throttled:", e);

        }
      }


      switch (action.type){
        case ACTIONS.TICK: {
          if(!state.isRunning) return state;

          if(state.timeLeft <=1){
            let nextMode = 'focus';
            let updatedSessionsCompleted = state.sessionsCompleted;
          }


          if(state.mode === 'focus'){

            updatedSessionsCompleted += 1;
            localStorage.setItem('pom_hub_sessions_completed', updatedSessionsCompleted.toString());

          }


          if(state.mode === 'focus'){
            if (updatedSessionsCompleted > 0 && updatedSessionsCompleted % state.settings.longBreakInterval === 0) {
            nextMode = 'long_break';
            } else {
              nextMode = 'short_break';
            }
          } else{
            nextMode = 'focus';
          }


          // HISTORY LOGS
          const logItem = {
            id: Date.now().toString(),
            type: state.mode, 
            label: state.mode === 'focus' ? 'Focus Session' : state.mode === 'short_break' ? 'Short Break' : 'Long Break',
            minutes: Math.round(state.duration / 60),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            dateStr: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
            associatedTask: state.mode === 'focus' ? trackedTaskText : 'Rest & Recharge Period'
           };


          const updatedHistory = [logItem, ...state.history];
           saveToStorage('pom_hub_history', updatedHistory);


          const nextDuration = nextMode === 'focus'? state.settings.focusTime * 60: 
           nextMode === 'short_break' ? state.settings.shortBreak * 60:
           state.settings.longBreak * 60;


           const autoStart = nextMode === 'focus' 
            ? state.settings.autoStartPomodoros 
            : state.settings.autoStartBreaks;

          return {
            ...state,
            mode: nextMode,
            timeLeft: nextDuration,
            duration: nextDuration,
            isRunning: autoStart,
            sessionsCompleted: updatedSessionsCompleted,
            history: updatedHistory,
        };

        return {
        ...state,
        timeLeft: state.timeLeft - 1
       };
       }


      // PLAY TIMER STATUS
      case ACTIONS.START:
      return {
        ...state,
        isRunning: true
      };

      case ACTIONS.PAUSE:
        return {
          ...state,
          isRunning: false
        };

      case ACTIONS.RESET:{
        const modeDuration = state.mode === 'focus' ? state.settings.focusTime * 60: state.mode === 'short_break' ?
        state.settings.shortBreak * 60 : state.settings.longBreak * 60;
      }
        return{
          ...state,
          timeLeft: modeDuration,
          duration: modeDuration,
          isRunning: false

        }
      }

      const Pomodoro = () => {

        const [state, dispatch] = useReducer(pomodoroReducer, null, getInitialState);
        const [showSettings, setShowSettings] = useState(false);


        // CLEAN MINIMALISM
        const getThemeStyle = ()=>{
        switch (state.mode) {
           case 'short_break':
           return{
             title: 'Short Break',
             pillText: 'Short Break',
             accentColor: 'text-sky-600',
             playBg: 'bg-sky-600 shadow-sky-100',
             ringFillColor: 'stroke-sky-500',
            accentBadge: 'bg-sky-50 text-sky-700 border-sky-100'
           };

           case 'long_break' :
           return {
             title: 'Long Break',
             pillText: 'Long Break',
             accentColor: 'text-indigo-600',
             playBg: 'bg-indigo-600 shadow-indigo-100',
             ringFillColor: 'stroke-indigo-500',
             accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-100'
           };

           case 'focus' :
           default:
           return {
             title: 'Focus',
             pillText: 'Focus Session',
             accentColor: 'text-slate-900',
             playBg: 'bg-indigo-600 shadow-indigo-100',
             ringFillColor: 'stroke-indigo-600',
             accentBadge: 'bg-slate-100 text-slate-800 border-slate-200'
           };
           }

        }

        const theme = getThemeStyle();
      }

  
    return (
      <div>

        {/* <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 hover:bg-slate-50 rounded-xl transition-all border-0 text-slate-500 cursor-pointer ${
                showSettings ? 'text-indigo-600 bg-slate-50' : 'bg-transparent'
              }`}
              title="Configure Timer lengths"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div> */}

          <div className="space-y-4">
            {/* Focus Timer Slider */}
            <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Focus block time</span>
                  <span className="text-indigo-600 font-bold">{state.settings.focusTime} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={state.settings.focusTime}
                  onChange={(e) => dispatch({ 
                    type: ACTIONS.UPDATE_SETTINGS, 
                    payload: { key: 'focusTime', value: parseInt(e.target.value, 10) } 
                  })}
                  className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>


              {/* Short Break Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Short Break time</span>
                  <span className="text-indigo-600 font-bold">{state.settings.shortBreak} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={state.settings.shortBreak}
                  onChange={(e) => dispatch({ 
                    type: ACTIONS.UPDATE_SETTINGS, 
                    payload: { key: 'shortBreak', value: parseInt(e.target.value, 10) } 
                  })}
                  className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>


              {/* Long Break Slider */}

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Long Break time</span>
                  <span className="text-indigo-600 font-bold">{state.settings.longBreak} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="45"
                  value={state.settings.longBreak}
                  onChange={(e) => dispatch({ 
                    type: ACTIONS.UPDATE_SETTINGS, 
                    payload: { key: 'longBreak', value: parseInt(e.target.value, 10) } 
                  })}
                  className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

          </div>

          {/* Mode Selection Button  */}
          <div id="timer_modes_filter_group" className="mb-8 flex gap-1 p-1 bg-slate-100 rounded-full border border-slate-200/50 relative">
              <button 
                type="button"
                onClick={() => dispatch({ type: ACTIONS.CHANGE_MODE, payload: 'focus' })}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border-0 tracking-wide cursor-pointer ${
                  state.mode === 'focus' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Focus
              </button>

              <button 
                type="button"
                onClick={() => dispatch({ type: ACTIONS.CHANGE_MODE, payload: 'short_break' })}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border-0 tracking-wide cursor-pointer ${
                  state.mode === 'short_break' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Short Break
              </button>

              <button 
                type="button"
                onClick={() => dispatch({ type: ACTIONS.CHANGE_MODE, payload: 'long_break' })}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border-0 tracking-wide cursor-pointer ${
                  state.mode === 'long_break' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Long Break
              </button>

              </div>


      </div>
    );
  }
  
  export default Pomodoro;