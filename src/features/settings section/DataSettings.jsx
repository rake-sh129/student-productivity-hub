import { useState } from 'react';
import { Database, Download, Trash2, AlertTriangle } from 'lucide-react';

const DataSettings = ({ onClearData }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    if (onClearData) {
      onClearData();
    }

    setShowConfirm(false);
  };

  return (
    <div className="settings-card animate-fadeIn">
      <div className="card-header-row">
        <div className="card-header-left">
          <div className="card-icon-wrapper">
            <Database />
          </div>
          <div className="card-titles">
            <h2 className="card-title">Data & Backups</h2>
            <p className="card-desc">
              Manage your hub configuration, backup preferences, or reset everything.
            </p>
          </div>
        </div>
        <span className="card-badge">Storage</span>
      </div>

      <div className="data-actions-list">
        <button type="button" className="data-action-item">
          <div className="data-action-left">
            <div className="data-action-left-icon">
              <Download size={18} />
            </div>
            <div>
              <div className="action-title">Export backup</div>
              <div className="action-subtitle">Download a copy of your current hub settings.</div>
            </div>
          </div>
          <span className="data-action-right">Soon</span>
        </button>

        <button
          type="button"
          className="data-action-item danger-trigger"
          onClick={handleClearClick}
        >
          <div className="data-action-left">
            <div className="data-action-left-icon">
              <Trash2 size={18} />
            </div>
            <div>
              <div className="action-title">Clear all hub data</div>
              <div className="action-subtitle">
                Remove saved theme, accent, and productivity preferences.
              </div>
            </div>
          </div>
          <span className="data-action-right">Reset</span>
        </button>
      </div>

      {showConfirm && (
        <div className="confirm-alert-box animate-slideUp" style={{ marginTop: '16px' }}>
          <div className="confirm-header">
            <AlertTriangle className="confirm-icon" size={18} />
            <div className="confirm-text">
              <div className="confirm-text-title">Confirm reset</div>
              <p className="confirm-text-desc">
                This will clear all saved Hub settings from this browser and restore defaults.
              </p>
            </div>
          </div>

          <div className="confirm-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleClearClick}>
              <Trash2 size={14} />
              Clear data
            </button>
          </div>
        </div>
      )}

      <div className="tip-box">
        <p>
          Clearing data only affects settings stored on this device. It does not remove the app itself.
        </p>
      </div>
    </div>
  );
};

export default DataSettings;