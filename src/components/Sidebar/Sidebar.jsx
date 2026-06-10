import { NavLink } from "react-router-dom"
import "./Sidebar.css"


const Sidebar = () => {
  return (
    <div>
        <aside className="sidebar">
            <NavLink to='/' >Dashboard </NavLink>

            <NavLink to="tasks" >Tasks </NavLink>

            <NavLink to="notes" >Notes </NavLink>

            <NavLink to="pomodoro" >Pomodoro </NavLink>

            <NavLink to="analytics" >Analytics </NavLink>
        </aside>
      
    </div>
  )
}

export default Sidebar
