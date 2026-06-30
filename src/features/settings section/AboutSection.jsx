/* eslint-disable no-unused-vars */

import { Info, HardDrive, GraduationCap } from "lucide-react";

const AboutSection = () => {
    const isLocalStorageAvailable = () => {
    try {
      localStorage.setItem('sph_test_connection', 'ok');
      localStorage.removeItem('sph_test_connection');
      return true;
    } catch (e) {
      return false;
    }
  };

  const isConnected = isLocalStorageAvailable();

  return (
    <div id="about-section-card" className="settings-card">
        <div className="card-header-row">
            <div className="card-header-left">
            <div className="card-icon-wrapper">
                <Info/>
            </div>

            <div className="card-titles">
               <h2 className="card-title">About Dashboard</h2>
               <p className="card-desc">Explore the build engine information and connectivity logs.</p>
            </div>
            </div>
        </div>

        <div>
            <div className="about-banner">
                <div className="about-banner-icon">
                    <GraduationCap/>
                </div>
                <div className="about-banner-texts">
                    <h3 className="about-banner-title">Student Productivity Hub</h3>
                    <p className="about-banner-desc">Designed as an educational showcase of modern, atomic UI components. Build with confidence using modular components.</p>
                </div>
            </div>

            <div className="specs-grid">
                <div className="specs-card">
                    <span className="specs-card-title">Engine Specifications</span>
                    <div className="specs-rows">
                        <div className="specs-row">
                            <span className="specs-row-label">Library Engine</span>
                            <span className="specs-row-value">React 19 + JSX</span>
                        </div>
                        <div className="specs-row">
                            <span className="specs-row-label">Build Utility</span>
                            <span className="specs-row-value">Vite + ESM Bundler</span>
                        </div>
                        <div className="specs-row">
                            <span className="specs-row-label">App Version</span>
                            <span className="specs-badge">v1.0.0</span>
                        </div>
                    </div>
                </div>

                <div className="specs-card">
                    <span className="specs-card-title">Storage Status</span>
                    <div className="specs-rows">
                        <div className="specs-row">
                            <span className="specs-row-label">
                                <HardDrive style={{ width: '14px', height: '14px' }} />
                                Primary Storage
                            </span>
                            <span className="specs-row-value">LocalStorage</span>
                        </div>

                        <div className="specs-row">
                            <span className="specs-row-label">Connection</span>
                            {isConnected ? (
                                    <span className="specs-row-value online">
                                        <span className="status-dot"></span>
                                        Online
                                    </span>
                                ) : (
                                    <span className="specs-row-value" style={{ color: '#ef4444' }}>Disconnected</span>
                                )}
                        </div>
                        
                        <div className="specs-row">
                            <span  className="specs-row-label">Scope Isolator</span>
                            <span  className="specs-badge" style={{ backgroundColor: 'rgba(217, 119, 6, 0.15)', color: '#d97706' }}>sph_* prefix</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="tip-box">
            <p>
                💡<strong>React Learnings:</strong>This section displays static configuration parameters and tests system status in real time. Checking if LocalStorage exists inside a standard `try/catch` block keeps the app healthy even if cookies are disabled by the cient.
            </p>
        </div>
      
    </div>
  )
}

export default AboutSection
