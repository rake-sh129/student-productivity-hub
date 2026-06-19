import AppRoutes from "./routes/AppRoutes";
import Pomodoro from "./components/pomodoro/Pomodoro";

const App = () => {
  return (
    <div>
      <AppRoutes></AppRoutes>
      <Pomodoro></Pomodoro>
    </div>
  )
}

export default App
