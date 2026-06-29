import React from 'react'

const DataSettings = ({accentColor}) => {
  return (
    <div>
        <div>
            <div></div>
            <div>
                <h2>Data Management</h2>
                <p>Manage your configuration file, backup studies , or reset variables.</p>
            </div>
        </div>

        <div>
            <button>
                <div>
                    <p>Export Backup Settings</p>
                    <p>Download hub-data.json</p>
                </div>
                <span>→</span>
            </button>

            <button>
                <div>
                    <p>Clear All Hub Data</p>
                    <p>Irreversible deletion</p>
                </div>
                <span>Confirm</span>
            </button>

            <div>
                <button>Cancel</button>
                <button>Yes, Clear</button>
            </div>
        </div>

        <div>
            <p> 💡 <strong>React Learnings:</strong> This component shows how to design <strong>Inline Safety Dialog</strong> using standard local boolean states instead of interrupting system prompts.</p>
        </div>

      
    </div>
  )
}

export default DataSettings
