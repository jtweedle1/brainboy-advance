import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
