import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    {/* Render the app */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Runs code that stores the bundle locally on a device enabling offline access
serviceWorkerRegistration.register();
