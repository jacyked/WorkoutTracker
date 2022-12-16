import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Layout from "./components/Layout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Error from "./components/Error";
import Home from "./components/user/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RequireAuth from "./components/auth/RequireAuth";
import UserProfile from "./components/user/UserProfile";



function App() {
  return (
          <Routes>
            <Route exact path="/" element ={<Layout />}>
              {/* Public Routes */}
              <Route path="/" element={<Landing />}/>
              <Route path="register" element={<Register />}/>
              <Route path="login" element={<Login />}/>

              <Route element={<RequireAuth />}>
                <Route path="home" element={<Home />}/>
                <Route path="user" element={<UserProfile />}/>
              </Route>

              <Route path="*" element={<Error />}/>
            </Route>
          </Routes>
  );
}

export default App;
