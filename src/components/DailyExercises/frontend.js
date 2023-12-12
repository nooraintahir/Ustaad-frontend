// QuestionsPage.js
/*
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Questions from "../Variables/Questions";

const QuestionsPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const Navigate = useNavigate();
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    Navigate.push(`/questions/${difficulty}`);
   // <Questions/>
//<Questions difficulty={selectedDifficulty} />
    // You will need to fetch questions based on the selected difficulty here
    // and display them in the container below.
  };

  
  


  return (
    <div>
      <h1>Choose a Difficulty Level</h1>
      
      <div>
      <Link to={`/questions/${selectedDifficulty}`}>
        <button onClick={() => handleDifficultyClick("easy")}>Easy</button>
        <button onClick={() => handleDifficultyClick("medium")}>Medium</button>
        <button onClick={() => handleDifficultyClick("hard")}>Hard</button>
       </Link>
      </div>
      <div>
        {/* Display questions based on the selected difficulty 
         {selectedDifficulty && <Questions difficulty={selectedDifficulty} />}
         <Questions difficulty={selectedDifficulty} />}


 

      
      </div>
    </div>
  );
};

export default QuestionsPage;
*/
// QuestionsPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Questions from "../Variables/Questions"; 
import './frontend.css';// Import useNavigate

const QuestionsPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate(); // Use a different variable name, e.g., navigate

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    console.log(`Selected Difficulty: ${selectedDifficulty}`);
    navigate(`/questions/${difficulty}`);
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
        {selectedDifficulty && <Questions difficulty={selectedDifficulty} />}
      </div>
      </div>
    
  );
};

export default QuestionsPage;
