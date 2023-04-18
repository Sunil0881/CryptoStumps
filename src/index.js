import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Contest from "./components/Contest";
import CreateTeam from "./components/CreateTeam";
import ContestCreation from "./components/ContestCreation";
import CurrentContest from "./components/CurrentContest";
import LeaderBoard from "./components/LeaderBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Link to="/" element={<App />} />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contest" element={<Contest />} />
      <Route path="/createTeam" element={<CreateTeam />} />
      <Route path="/createContest" element={<ContestCreation />} />
      <Route path="/currentContest" element={<CurrentContest />} />
      <Route path="/leaderBoard" element={<LeaderBoard />} />
    </Routes>
  </Router>
);
