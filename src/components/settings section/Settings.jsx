import React, { useEffect, useState } from 'react';
import AppearanceSettings from './AppearanceSettings';
import AboutSection from './AboutSection'
import DataSettings from './DataSettings';
import ProductivitySettings from './ProductivitySettings';
import {Settings as SettingsIcon, Sparkles, Timer, Database, Info, GraduationCap, Undo2, Save} from "lucide-react";


const Settings = () => {

    const [theme, setTheme] = useState(() =>{
        const savedTheme = localStorage.getItem('sph_theme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme: 'light';
    });

    const [accentColor, setAccentColor] = useState(() =>{
        const savedAccent = localStorage.getItem('sph_accent_color');
        return (savedAccent === 'blue' || savedAccent === 'emerald' || savedAccent === 'amber' || savedAccent === 'rose' || savedAccent === 'slate') ?
        savedAccent : 'blue';
    });

    const [productivity, setProductivity] = useState(()=>{
        const savedProd = localStorage.getItem('sph_productivity_settings');
        if(savedProd){
            try{
                return JSON.parse(savedProd);
            } catch (e){
                console.error("Failed to parse productivity settings", e);
            }
        }
        return{
            focusDuration: 25,
            shortBreak: 5,
            longBreak: 15,
            notificationsEnabled: true,
            autoSaveNotes: true, 
        };
    });

    const [activeTab, setActiveTab] = useState('all');
    const[toastMessage, setToastMessage] = useState(null);

    useEffect(() =>{
        const rootElement = window.document.documentElement;
        if( theme === 'dark'){
            rootElement.classList.add('dark');
        } else {
            rootElement.classList.remove('dark');
        }
        localStorage.setItem('sph_theme', theme);
    }, [theme]);

    useEffect(() =>{
        const rootElement = window.document.documentElement;
        rootElement.setAttribute('data-accent', accentColor);
        localStorage.setItem('sph_accent_color', accentColor);
    }, [accentColor])


    const handleUpdateProductivity = (newSettings) =>{
        setProductivity((prev) =>({
            ...prev,
            ...newSettings
        }));
    }

    const handleClearData = () =>{
        localStorage.removeItem('sph_theme');
        localStorage.removeItem('sph_accent_color');
        localStorage.removeItem('sph_productivity_settings');

        setTheme('light');
        setAccentColor('blue');
        setProductivity({
        focusDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        notificationsEnabled: true,
        autoSaveNotes: true,
        })
        triggerToast("Hub configuration reset to default values! 🧹");
    }

    const triggerToast = (msg) =>{
        setToastMessage(msg);
        const timer = setTimeout(()=>{
            setToastMessage(null);
        }, 2500);
        return ()=> clearTimeout(timer);
    }

    const navigationItems = [
        { id: 'all', label: 'All Settings Overview', icon: SettingsIcon },
        { id: 'appearance', label: 'Appearance', icon: Sparkles },
        { id: 'productivity', label: 'Productivity Timer', icon: Timer },
        { id: 'data', label: 'Data & Backups', icon: Database },
        { id: 'about', label: 'About Hub Engine', icon: Info }
    ]




  return (
    <div className="settings-app-container">

        <header  id="main-hub-header" className="settings-header">
            <div className="header-inner">
                <div className="header-brand">
                    <div className="header-logo"><GraduationCap/></div>
                    <div className="header-titles">
                        <span className="header-subtitle">Workspace Prefs</span>
                        <h1  className="header-title">System Settings</h1>
                    </div>
                </div>

                <div className="header-actions">
                    <button type="button"
                    id="header-btn-reset" className="btn btn-text" title="Reset Settings to Factory Defaults">
                        <Undo2 style={{ width: '14px', height: '14px' }} />
                        <span>Reset Defaults</span>
                    </button>

                    <button type="button" onClick={() => triggerToast("All preferences saved successfully! ✨")}
                    id="header-btn-save" className="btn btn-primary">
                        <Save style={{ width: '14px', height: '14px' }} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </header>


        <main className="settings-grid-main">
            <div className="settings-grid-layout">
                <nav id="sidebar-navigation" className="settings-sidebar">
                    <div  className="sidebar-title"><span>Settings Panel</span></div>

                    <div className="sidebar-nav-list">
                        {navigationItems.map((item)=> {
                            const IconComponent = item.icon;
                            const isActive = activeTab === item.id;
                            return(
                                <button id={`nav-tab-${item.id}`} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                key={item.id} type="button" onClick={()=> setActiveTab(item.id)}
                                ><IconComponent />
                                <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="sidebar-profile-card">
                        <div className="profile-avatar">SD</div>
                        <div className="profile-info">
                            <p className="profile-name">Student Developer</p>
                            <p className="profile-email">learn-react@hub.edu</p>
                        </div>
                    </div>
                </nav>

                <section id="settings-canvas-pane" className="settings-canvas-pane">
                    {
                        (activeTab === 'all' || activeTab === 'appearance') && (
                            <AppearanceSettings
                            theme={theme}
                            setTheme={setTheme}
                            accentColor={accentColor}
                            setAccentColor={setAccentColor}/>
                        )
                    }
                    {
                        (activeTab === 'all' || activeTab === 'productivity') && (
                            <ProductivitySettings 
                            settings={productivity}
                            updateSettings={handleUpdateProductivity}
                            accentColor={accentColor}/>
                        )
                    }
                    {
                        (activeTab === 'all' || activeTab === 'data') && (
                            <DataSettings
                            accentColor={accentColor}/>
                        )
                    }
                    {
                        (activeTab === 'all' || activeTab === 'about') && (
                            <AboutSection accentColor={accentColor}/>
                        )
                    }

                </section>
            </div>
        </main>

        {
            toastMessage && (
                <div id="toast-notification" className="toast-notification">
                    <div className="toast-pulse"></div>
                    <span>{toastMessage}</span>
                </div>
            )
        }
      
    </div>
  )
}

export default Settings
