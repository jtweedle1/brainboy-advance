import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router";
import NewQuest from "./pages/NewQuest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-quest"
        element={
          <ProtectedRoute>
            <NewQuest />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
