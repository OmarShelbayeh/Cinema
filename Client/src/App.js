import React from "react";
import { Routes, Route } from "react-router-dom";

import "./css/General/App.css";

import AdminDashboard from "./Pages/Dashboards/AdminDashboard";
import UserDashboard from "./Pages/Dashboards/UserDashboard";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Stages from "./Pages/Stages/Stages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        {/* User */}
        <Route exact path="/dashboard" element={<UserDashboard />} />

        {/* Admin */}
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        <Route exact path="/stages" element={<Stages />} />
      </Routes>
    </div>
  );
}

export default App;
