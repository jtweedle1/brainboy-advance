import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
