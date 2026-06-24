import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./Stores/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/student-productivity-hub">
    <Provider store = {store}>
    <App />
    </Provider>
  </BrowserRouter>
);
