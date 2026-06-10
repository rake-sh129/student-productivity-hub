import {Routes ,Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Notes from "../pages/Notes";
import Tasks from "../pages/Tasks";
import Pomodoro from "../pages/Pomodoro";
import Goals from "../pages/Goals";
import Calendar from "../pages/Calendar"
import Analytics from "../pages/Analytics";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="notes" element={<Notes />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="goals" element={<Goals />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;




