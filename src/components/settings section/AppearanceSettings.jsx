import React from 'react'

const AppearanceSettings = ({theme, setTheme, accentColor, setAccentColor}) => {
  return (
    <div>
        <div>
            <div>
                <div>Sparkles</div>
                <div>
                    <h2>Appearance</h2>
                    <p>Switch between light/dark mode and choose your accent color.</p>
                </div>
            </div>

            <span>Live Preview</span>
        </div>

        <div>
            <button type="button">
                <div>Sun</div>
                <div>
                    <div>Light Mode</div>
                    <div>Perfect for bright environments.</div>
                </div>
            </button>

            <button type="button">
                <div>Moon</div>
                <div>
                    <div>Dark Mode</div>
                    <div>Gentle on your eyes during night study.</div>
                </div>
            </button>
        </div>

        <div>
            <p>Accent Color</p>
            <div>
                <button type="button"></button>
            </div>
        </div>

        <div>
            <p> 💡 <strong>React Learnings:</strong>We lifted the theme and accent color states up to the parent. Now, choosing any accent color immediately passes down new visual styling parameters, updating buttons, toggles, and highlights in real time.</p>
        </div>
      
    </div>
  )
}

export default AppearanceSettings
