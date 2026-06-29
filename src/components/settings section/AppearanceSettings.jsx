import React from 'react'
import { Sun, Moon, Sparkles } from "lucide-react";

const AppearanceSettings = ({theme, setTheme, accentColor, setAccentColor}) => {

    const colorOptions = ['blue', 'emerald', 'amber', 'rose', 'slate'];
  return (
    <div  id="appearance-settings-card" className="settings-card">
        <div className="card-header-row">
            <div className="card-header-left">
                <div className="card-icon-wrapper"><Sparkles/></div>
                <div className="card-titles">
                    <h2  className="card-title">Appearance</h2>
                    <p className="card-desc">Switch between light/dark mode and choose your accent color.</p>
                </div>
            </div>

            <span className="card-badge">Live Preview</span>
        </div>

        <div className="theme-grid">
            <button type="button" onClick={()=> setTheme('light')}
            id="btn-theme-light" className={`theme-button ${theme === 'light' ? 'active' : ''}`}>
                <div className="theme-button-icon"><Sun/></div>
                <div className="theme-button-text">
                    <div className="theme-button-text-title">Light Mode</div>
                    <div className="theme-button-text-desc">Perfect for bright environments.</div>
                </div>
            </button>

            <button type="button" onClick={()=> setTheme('dark')}
            id="btn-theme-dark"  className={`theme-button ${theme === 'dark' ? 'active' : ''}`}>
                <div className="theme-button-icon"><Moon/></div>
                <div className="theme-button-text">
                    <div className="theme-button-text-title">Dark Mode</div>
                    <div className="theme-button-text-desc">Gentle on your eyes during night study.</div>
                </div>
            </button>
        </div>

        <div className="accent-section">
            <p className="accent-title">Accent Color</p>
            <div className="accent-row">
                {colorOptions.map((color) => {
                    <button type="button" key={color} onClick={()=> setAccentColor(color)}
                    id={`accent-btn-${color}`}
                    className={`accent-circle ${accentColor === color ? 'active' : ''}`}
                    data-color={color}
                    title={`Activate ${color} theme`}
                    ></button>
                })}
            </div>
        </div>

        <div className="tip-box">
            <p> 💡 <strong>React Learnings:</strong>We lifted the theme and accent color states up to the parent. Now, choosing any accent color immediately passes down new visual styling parameters, updating buttons, toggles, and highlights in real time.</p>
        </div>
      
    </div>
  )
}

export default AppearanceSettings
