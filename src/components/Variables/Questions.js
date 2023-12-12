/*import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './Questions.css';
import { useParams } from "react-router-dom";
import QuestionsPage from "../DailyExercises/frontend";

import axios from "axios";


function Questions(){ 
    const [details, setDetails] = useState([]); 
    const { difficulty } = useParams();
    useEffect(() => {
        // Axios request inside useEffect
        axios.get('http://localhost:8000')
          .then(res => {
            setDetails(res.data);
           
          })
          .catch(err => {
            console.error(err);
           
          });
      }, [difficulty]); 




      return (
        <div>
            <Container fluid className="qcontent">
                <Container>
                    <Row style={{ justifyContent: "center", padding: "10px" }}>
                        <Col
                            md={7}
                            style={{
                                justifyContent: "center",
                                paddingTop: "5px",
                                paddingBottom: "10px",
                            }}
                        >

                    {details.length > 0 && (
                <header style={{ fontSize: "70px" }}>
                     <strong classname="purple">Questions for {difficulty} difficulty:</strong>
                {/*
                <strong className="purple">{details[0].title}</strong>
                    }
                  <hr></hr>
                </header>
              )}
             

                    {details.map((output, id) => (
                     <div key={id} className="difficultyLevel" >
                     {id % 10 === 0 ? (
                       <h1 style={{fontSize: "20px" }}>
                         <strong className="tech-icons">{details[20].difficulty_level}</strong>
                       </h1>
                     ) : null}
                   
                     
                     <div className="questionContainer">
                       <h4>{output.question}</h4>
                     </div>
                   </div>
                 ))}
                       </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )   
}




     
/*
    return(
            <div>


<Container fluid className="qcontent">
     
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
          </Col>

<header> GOT IT FINALLY </header>
        <hr></hr>
        {details.map((output, id) => (
          <div key={id}>
            <div classname = "qcontent">
              <h2>{output.title}</h2>
              <h3>{output.difficulty_level}</h3>
              <h4>{output.question}</h4>
            </div>
          </div>
        ))}
        </Container>
            </Container>
            </div>
        
    
    )   
}
*/
//export default Questions;

/*
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './Questions.css';
import { useParams } from "react-router-dom";
import axios from "axios";

function Questions() {
  const [details, setDetails] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { difficulty } = useParams();

  useEffect(() => {
    // Axios request inside useEffect to fetch questions based on difficulty
    axios.get(`http://localhost:8000?difficulty=${difficulty}`)
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [difficulty]);

 
  const checkdifficultylevel = () => {
    if (difficulty === details[0].difficulty_level) {
     setCurrentQuestionIndex(0)}
      if (difficulty === details[10].difficulty_level) {
        setCurrentQuestionIndex(10)}
        if (difficulty === details[20].difficulty_level) {
          setCurrentQuestionIndex(10)}
      
  };
  
  const nextQuestion = () => {
    checkdifficultylevel()
    if (currentQuestionIndex < details.length - 1 && currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };




  return (
    <div>
      <Container fluid className="qcontent">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "5px",
                paddingBottom: "10px",
             
              }}
            >

              {details.length > 0 && (
                <header style={{ fontSize: "70px" }}>
                  <strong className="purple">Question for {difficulty} difficulty:</strong>
                  <hr />
                </header>
              )}

              {details.length > 0 && currentQuestionIndex < details.length && (
                <div className="questionContainer">
                  <h4>{details[currentQuestionIndex].question}</h4>
                </div>
              )}

              {details.length > 0 && currentQuestionIndex < details.length - 1 && (
                <Button onClick={nextQuestion}>Next</Button>
              )}

            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Questions;
*/

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './Questions.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chrome";

function Questions() {
  const [details, setDetails] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextEasy, setnextEasy] = useState(0);
  const [nextMedium, setnextMedium] = useState(9);
  const [nextHard, setnextHard] = useState(19);
  const { difficulty } = useParams();
  const [width, setWidth] = useState(1200);
  const [cppCode, setCppCode] = useState("");
  const [compilerResult, setCompilerResult] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    // Axios request inside useEffect to fetch questions based on difficulty
    axios.get(`http://localhost:8000?difficulty=${difficulty}`)
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [difficulty]);

  const nextQuestion = () => {
    
   
    if (
      currentQuestionIndex < details.length - 1 &&
      currentQuestionIndex < 9 &&
      details[currentQuestionIndex].difficulty_level === difficulty
    ) {
      console.log(currentQuestionIndex)
      setCurrentQuestionIndex(nextEasy + 1);
      setnextEasy(nextEasy+1);
    } else if (difficulty === "Medium" && currentQuestionIndex < 19) {
        console.log(currentQuestionIndex)
      setCurrentQuestionIndex(nextMedium+1);
      setnextMedium(nextMedium+1); //currentQuestionIndex + 1);
    } else if (difficulty === "Hard" && currentQuestionIndex < 29) {
      console.log(currentQuestionIndex)
      setCurrentQuestionIndex(nextHard+1);
      setnextHard(nextHard+1);
     
    }
  };
  const fetchOutputContent = async (outputLink) => {
    try {
      const response = await fetch(outputLink);

      if (response.ok) {
        const outputContent = await response.text();
        setCompilerResult((prevResult) => ({
          ...prevResult,
          run_status: { ...prevResult.run_status, output: outputContent },
        }));
      } else {
        setCompilerResult({ error: "Failed to fetch output content." });
      }
    } catch (error) {
      console.error("Error fetching output content:", error);
    }
  };

  const compileCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: cppCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setCompilerResult(data);
        setCheckingStatus(true);
        checkCompilationStatus(data.status_update_url);
        console.log("Response Data:", data);
      } else {
        setCompilerResult({ error: "Compilation failed. Please try again." });
      }
    } catch (error) {
      console.error("Error compiling code:", error);
    }
  };

  const checkCompilationStatus = async (statusUpdateUrl) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(statusUpdateUrl, {
          method: "GET",
          headers: {
            "client-secret": "0c4dfc1b49c97871aab1e4576bb9901ebd1171f6",
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.request_status.code === "REQUEST_COMPLETED") {
            if (data.result.run_status && data.result.run_status.output) {
              fetchOutputContent(data.result.run_status.output);
            }

            setCheckingStatus(false);
            clearInterval(interval);
          } else if (
            data.request_status.code === "CODE_COMPILED" &&
            data.result.compile_status !== "OK"
          ) {
            setCompilerResult({ compile_status: data.result.compile_status });

            setCheckingStatus(false);
            clearInterval(interval);
          }
        } else {
          setCompilerResult({ error: "Compilation failed. Please try again." });
        }
      } catch (error) {
        console.error("Error checking compilation status:", error);
      }
    }, 2000);

    return interval;
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);


/*
const nextQuestion = () => {
  let nextIndex = currentQuestionIndex;
 const[nextMedium, setnextMedium] = usestate(11);
  if (currentQuestionIndex < details.length - 1) {
    if (difficulty === "Easy" && currentQuestionIndex < 9) {
      nextIndex = currentQuestionIndex + 1;
    } else if (difficulty === "Medium" && currentQuestionIndex < 19) {

      nextIndex = currentQuestionIndex + 1;
    } else if (difficulty === "Hard" && currentQuestionIndex < 29) {
      nextIndex = currentQuestionIndex + 1;
    }
  }

  setCurrentQuestionIndex(nextIndex);
};
*/
  

  return (
    <div>
      <Container fluid className="qcontent">
        <Container>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "5px",
                paddingBottom: "10px",
              }}
            >
            

              {details.length > 0 && (
                <header style={{ fontSize: "70px" }}>
                  <strong className="purple">{difficulty}</strong><span> Questions:</span>
                  <hr />
                </header>
             )}

              {details.length > 0 && currentQuestionIndex < details.length && (
                <div className="questionContainer">
                  <h4>{details[currentQuestionIndex].question}</h4>
                </div>
              )}

<div style={{ textAlign: "center"}}>
            <AceEditor
              mode="c_cpp"
              theme="chrome"
              name="code-editor"
              fontSize={16}
              value={cppCode}
              onChange={(value) => setCppCode(value)}
              editorProps={{ $blockScrolling: true }}
              width="600px"
              height="300px"
              
            />
          </div>
          <div>
            <Button
              onClick={compileCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"20px" }}
              disabled={checkingStatus}
            >
              <AiOutlineDownload />
              &nbsp;Compile
            </Button>
            {details.length > 0 && currentQuestionIndex < details.length - 1 && (
                <Button onClick={nextQuestion} style={{marginLeft:"20px", marginTop:"20px"}}>Next</Button>
              )}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <pre>
              {compilerResult && compilerResult.error ? (
                <div>
                  <h3>Error:</h3>
                  <pre>{compilerResult.error}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.compile_status ? (
                <div>
                  <h3>Error:</h3>
                  <pre>{compilerResult.compile_status}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.run_status ? (
                <div>
                  <h3>Output:</h3>
                  <pre>{compilerResult.run_status.output}</pre>
                </div>
              ) : null}
            </pre>
          </div>
              

            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Questions;
