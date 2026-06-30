import React from 'react';
import { Timer, Bell, Clock } from "lucide-react";

const ProductivitySettings = ({settings, updateSettings}) => {

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
    <div id="productivity-settings-card" className="settings-card">
        <div className="card-header-row">
            <div className="card-header-left">
                <div><Timer/></div>
            <div className="card-titles">
                <h2 className="card-title">Productivity Timer</h2>
                <p className="card-desc">Configure your study session durations and automated triggers.</p>
            </div>
            </div>
        </div>

        <div className="timer-inputs-block">
            <h3 className="section-header"> <Clock/>
                Pomodoro Timers (Minutes)</h3>
            <div className="timer-grid">
                <div className="input-field-group">
                    <label htmlFor="input-focus-duration" className="input-label">Focus</label>
                    <div  className="input-wrapper">
                       <input type="number" min="1" max="180" value={settings.focusDuration}
                       onChange={(e)=> handleNumberChange('focusDuration', e.target.value)}
                       id="input-focus-duration" className="input-field"/>
                       <span className="input-suffix">min</span>
                    </div>
                </div>

                 <div className="input-field-group">
                    <label htmlFor="input-short-break" className="input-label">Short</label>
                    <div className="input-wrapper">
                        <input type="number" min="1" max="60"  value={settings.shortBreak}
                        onChange={(e)=> handleNumberChange('sohrtBreak', e.target.value)}
                        id="input-short-break" className="input-field"/>
                        <span className="input-suffix">min</span>
                    </div>
                </div>

                <div className="input-field-group">
                    <label htmlFor="input-long-break" className="input-label">Long</label>
                    <div className="input-wrapper">
                        <input type="number" min="1" max="120" value={settings.longBreak}
                        onChange={(e)=> handleNumberChange('longBreak', e.target.value)}
                        id="input-long-break"  className="input-field" />
                        <span className="input-suffix">min</span>
                    </div>
                </div>
            </div>
        </div>

        <hr className="settings-divider"  />

        <div>
            <div className="automation-block">
                <h3 className="section-header"> <Bell/>Hub Automation & Notifications</h3>
                <div className="toggle-row">
                    <div className="toggle-text-col">
                        <label htmlFor="toggle-notifications" className="toggle-label">Desktop Notifications</label>
                        <span className="toggle-desc">Ring audio alerts when timer focus cycles complete.</span>
                    </div>

                    <button type="button" role="switch"
                    aria-checked={settings.notificationsEnabled}
                    onClick={() => handleToggleChange('notificationsEnabled')}
                    id="toggle-notifications" 
                    className={`toggle-switch ${settings.notificationsEnabled ? 'active' : ''}`}>
                        <span className="toggle-knob" />
                    </button>
                </div>

                <div className="toggle-row">
                    <div className="toggle-text-col">
                        <label htmlFor="toggle-autosave" className="toggle-label">Auto-save Active Sessions</label>
                        <span className="toggle-desc">Instantly save workspace journals to local browser cache.</span>
                    </div>
                    <button type="button" role="switch"
                    id="toggle-autosave"
                    aria-checked={settings.autoSaveNotes}
                    onClick={() => handleToggleChange('autoSaveNotes')}
                    className={`toggle-switch ${settings.autoSaveNotes ? 'active' : ''}`}>
                        <span className="toggle-knob" />
                    </button>
                </div>
            </div>

            <div className="tip-box">
                <p>💡 <strong>React Learnings:</strong>This component shows <strong>Controlled Inputs</strong>in action. The input's value is wired directly to the React prop, and any change triggers the parent callback function seamlessly.</p>
            </div>
        </div>
      
    </div>
  )
}

export default ProductivitySettings
