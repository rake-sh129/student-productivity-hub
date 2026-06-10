import Navbar from "../Navbar/Navbar.jsx"
import Sidebar from "../Sidebar/Sidebar.jsx"
import { Outlet } from "react-router-dom"
import "../../styles/layout.css";


function MainLayout(){
  return (
    <div>
      <Navbar />

      <div className="layout-container">
        <Sidebar />

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout

