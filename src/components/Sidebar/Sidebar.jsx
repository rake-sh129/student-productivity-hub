import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Timer,
  Repeat,
  Target,
  BookOpen,
  Trophy,
  CalendarDays,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Notes", path: "/notes", icon: FileText },
  { label: "Pomodoro", path: "/pomodoro", icon: Timer },
  { label: "Habits", path: "/habits", icon: Repeat },
  { label: "Goals", path: "/goals", icon: Target },
  { label: "Resources", path: "/resources", icon: BookOpen },
  { label: "Achievement", path: "/achievement", icon: Trophy },
  { label: "Settings", path: "/settings", icon: CalendarDays },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="streak-card">
          <p>Study Streak 🔥</p>
          <h3>7 Days</h3>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;