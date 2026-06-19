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

            <NavLink to="habits" >Habits </NavLink>

            <NavLink to="goals" >Goals </NavLink>


            <NavLink to="resources" >Resources </NavLink>

            <NavLink to="analytics" >Analytics </NavLink>

            <NavLink to="calendar" >Calendar </NavLink>


        </aside>
      
    </div>
  )
}

export default Sidebar
