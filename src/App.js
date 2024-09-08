import "./App.css";
import "./Custom.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import LoginForm from "./component/login";

import Graph from "./component/graph";
import CryptoList from "./component/cryptoList";
import Converter from "./component/converter";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/Converter" />} />
        <Route path="/Converter" element={<Converter />} />
        <Route path="/CryptoList" element={<CryptoList />} />
        <Route path="/Graphs" element={<Graph />} />
      </Routes>
    </Router>
  );
}

export default App;
