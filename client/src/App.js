import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({

});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="App-header">
        <Router>
          <Routes>
          <Route exact path="/" element ={<Landing />}/>
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/login" element={<Login />}/>
          </Routes>
        </Router>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
