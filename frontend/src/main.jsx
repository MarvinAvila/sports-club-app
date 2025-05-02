import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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
    <PagosProvider>
      <App />
    </PagosProvider>
  </React.StrictMode>
);
