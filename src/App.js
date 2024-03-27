// App.js
import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import axios from 'axios';
import About from "./components/About/About";
import Modules from "./components/Modules/Modules";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import Compiler from "./components/Compiler/Compiler";
import Questions from "./components/Questions/Questions";
import ProgressTracking from "./components/ProgressTracking/ProgressTracking";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);
  const [details, setDetails] = useState([]); // State for storing details
  const [authenticated, setAuthenticated] = useState(false); // State for authentication

  useEffect(() => {
    // Axios request inside useEffect
    axios.get('http://localhost:8000')
      .then(res => {
        setDetails(res.data);
        updateLoad(false);
      })
      .catch(err => {
        console.error(err);
        updateLoad(false);
      });
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar authenticated={authenticated} />
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/about" element={<About />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/trackprogress" element={<ProgressTracking />} />

            <Route path="/:topic/:difficulty" element={<Compiler /*details={details}*/ />} />
            <Route path="/:topic" element={<Questions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
