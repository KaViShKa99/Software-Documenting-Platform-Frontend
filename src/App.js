import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import './index.css';
import SignIn from "./components/SignIn.js";
import Home from "./components/Home.js";
import ProjectView from "./components/PojectView";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projectView" element={<ProjectView />} />
        </Route>
        <Route exact path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
