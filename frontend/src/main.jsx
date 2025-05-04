import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthWrapper from "./contexts/AuthProvider";
import "./styles/index.css";
import { PagosProvider } from "./contexts/PagosContext";

if (!localStorage.getItem("theme")) {
  localStorage.setItem(
    "theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <PagosProvider>
        <AuthWrapper />
      </PagosProvider>
    </Router>
  </React.StrictMode>
);
