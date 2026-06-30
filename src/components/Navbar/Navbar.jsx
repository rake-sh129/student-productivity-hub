/* eslint-disable react-hooks/set-state-in-effect */
import { Bell, Search, GraduationCap, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark-theme", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("app-theme", nextTheme);
    document.body.classList.toggle("dark-theme", nextTheme === "dark");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <GraduationCap size={20} />
        </div>

        <div className="navbar-brand-text">
          <h1>Student Productivity Hub</h1>
          <p>Organize your learning journey</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notif-dot"></span>
        </button>

        <div className="profile-dot">S</div>
      </div>
    </header>
  );
};

export default Navbar;