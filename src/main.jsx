import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./Stores/store";
import { Provider } from "react-redux";
import './styles/global.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <Provider store = {store}>
    <App />
    </Provider>
  </BrowserRouter>
);
