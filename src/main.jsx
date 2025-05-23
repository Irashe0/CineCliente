import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";  
import App from "./App";
import './styles/index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
