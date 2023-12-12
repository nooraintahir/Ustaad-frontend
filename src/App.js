import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import axios from 'axios';
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Questions from "./components/Variables/Questions";
import QuestionsPage from "./components/DailyExercises/frontend";
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
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/questionpage" element={<QuestionsPage />}/>
          <Route path="/questions/:difficulty" element={<Questions /*details={details}*/ />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
