import React from 'react'

const ProductivitySettings = ({accentColor, settings, updateSettings}) => {

    const handleNumberChange = (key, value) => {
        const numValue = parseInt(value, 10);
        if(!isNan(numValue)){
            updateSettings({ [key]: numValue});
        }
    }

    const handleToggleChange = (key) =>{
        updateSettings({ [key]: !settings[key]});
    };
  return (
    <div>
        <div>
            <div>Timer</div>
            <div>
                <h2>Productivity Timer</h2>
                <p>Configure your study session durations and automated triggers.</p>
            </div>
        </div>

        <div>
            <h3>Pomodoro Timers</h3>
            <div>
                <div>
                    <label htmlFor="input-focus-duration">Focus</label>
                    <div>
                       <input type="number" min="1" max="180" />
                       <span>Min</span>
                    </div>
                </div>

                 <div>
                    <label htmlFor="input-short-break">Short</label>
                    <div>
                        <input type="number" min="1" max="60" />
                        <span>min</span>
                    </div>
                </div>

                <div>
                    <label htmlFor="input-long-break">Long</label>
                    <div>
                        <input type="number" min="1" max="120" />
                        <span>min</span>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div>
                <h3>Hub Automation & Notifications</h3>
                <div>
                    <div>
                        <label htmlFor="toggle-notifications">Desktop Notifications</label>
                        <span>Ring audio alerts when timer focus cycles complete.</span>
                    </div>

                    <button></button>
                </div>

                <div>
                    <div>
                        <label htmlFor="toggle-autosave">Auto-save Active Sessions</label>
                        <span>Instantly save workspace journals to local browser cache.</span>
                    </div>
                    <button></button>
                </div>
            </div>

            <div>
                <p>💡 <strong>React Learnings:</strong>This component shows <strong>Controlled Inputs</strong>in action. The input's value is wired directly to the React prop, and any change triggers the parent callback function seamlessly.</p>
            </div>
        </div>
      
    </div>
  )
}

export default ProductivitySettings
