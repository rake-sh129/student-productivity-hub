import React from 'react';
import { Database, Download, Trash2, AlertTriangle} from "lucide-react";

const DataSettings = () => {
  return (
    <div id="data-settings-card" className="settings-card">
        <div className="card-header-row">
            <div className="card-header-left">
                <div className="card-icon-wrapper">
                    <Database/>
                </div>
                <div className="card-titles">
                    <h2 className="card-title">Data Management</h2>
                    <p className="card-desc">Manage your configuration file, backup studies , or reset variables.</p>
                </div>
            </div>
        </div>

        <div className="data-actions-list">
            <button type='button'
            id="btn-export-data"
            className="data-action-item">
                <div className="data-action-left">
                    <div className="data-action-left-icon">
                        <Download style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div>
                        <p>Export Backup Settings</p>
                        <p>Download hub-data.json</p>
                    </div>
                </div>
                <span className="data-action-right">→</span>
            </button>

            <button type="button"  
            id="btn-clear-trigger" className="data-action-item danger-trigger">
                <div className="data-action-left">
                    <div className="data-action-left-icon">
                        <Trash2  style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div>
                        <p className="action-title">Clear All Hub Data</p>
                        <p className="action-subtitle">Irreversible deletion</p>
                    </div>
                </div>
                <span className="data-action-right">Confirm</span>
            </button>

            <div className="confirm-buttons">
                <button type='button' 
                id="btn-confirm-cancel" className="btn btn-secondary"
                >Cancel</button>
                <button type='button'
                id="btn-confirm-delete" className="btn btn-danger">Yes, Clear</button>
            </div>
        </div>

        <div className="tip-box">
            <p> 💡 <strong>React Learnings:</strong> This component shows how to design <strong>Inline Safety Dialog</strong> using standard local boolean states instead of interrupting system prompts.</p>
        </div>

      
    </div>
  )
}

export default DataSettings
