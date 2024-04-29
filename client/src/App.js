import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Navbar from "./components/Navbar";
import Chart from "./pages/Charts";
import Statement from "./pages/Statement";

// Sets up the routing between the pages
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/statement" element={<Statement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
