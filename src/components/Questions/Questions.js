// QuestionsPage.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
import Compiler from "../Compiler/Compiler"; 
import './frontend.css';// Import useNavigate

const Questions = () => {
  let { topic } = useParams();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate(); // Use a different variable name, e.g., navigate

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    console.log(`Selected Difficulty: ${selectedDifficulty}`);
    navigate(`/${topic}/${difficulty}`);
    // You will need to fetch questions based on the selected difficulty here
    // and display them in the container below.
  };

  return (


    <div className="qcontent">
      <h1 style={{ fontSize: '50px' }}>Choose a <strong className="purple">Difficulty</strong> Level</h1>
     
      <div className="buttonsalign">
          <button onClick={() => handleDifficultyClick("Easy")} className="tech-icons">Easy</button>
          <button onClick={() => handleDifficultyClick("Medium")}className="tech-icons">Medium</button>
          <button onClick={() => handleDifficultyClick("Hard")}className="tech-icons">Hard</button>
     
     </div>
      <div>
        {/* Display questions based on the selected difficulty */}
        {selectedDifficulty && <Compiler difficulty={selectedDifficulty} />}
      </div>
      </div>
    
  );
};

export default Questions;
