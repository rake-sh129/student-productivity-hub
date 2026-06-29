import React from 'react'

const AboutSection = () => {
  return (
    <div>
        <div>
            <div>info</div>

            <div>
               <h2>About Dashboard</h2>
               <p>Explore the build engine information and connectivity logs.</p>
            </div>
        </div>

        <div>
            <div>
                <div>Graduation Cap</div>
                <div>
                    <h3>Student Productivity Hub</h3>
                    <p>Designed as an educational showcase of modern, atomic UI components. Build with confidence using modular components.</p>
                </div>
            </div>

            <div>
                <div>
                    <span>Engine Specifications</span>
                    <div>
                        <div>
                            <span>Library Engine</span><span>React 19 + JSX</span>
                        </div>
                        <div>
                            <span>Build Utility</span><span>Vite + ESM Bundler</span>
                        </div>
                        <div>
                            <span>App Version</span><span>v1.0.0</span>
                        </div>
                    </div>
                </div>

                <div>
                    <span>Storage Status</span>
                    <div>
                        <div>
                            <span>Primary Storage</span>
                            <span>LocalStorage</span>
                        </div>

                        <div>
                            <span>Connection</span>
                        </div>
                        
                        <div>
                            <span>Scope Isolator</span><span>sph_* prefix</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <p>
                💡<strong>React Learnings:</strong>This section displays static configuration parameters and tests system status in real time. Checking if LocalStorage exists inside a standard `try/catch` block keeps the app healthy even if cookies are disabled by the cient.
            </p>
        </div>
      
    </div>
  )
}

export default AboutSection
