import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>  
          </Routes>
        </BrowserRouter>
      );
};

export default App;