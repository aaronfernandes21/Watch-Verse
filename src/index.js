import React from "react";
import ReactDOM from "react-dom/client"; // Notice this change
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root using createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
