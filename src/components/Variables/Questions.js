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
  let compiler = true;

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
    compiler = true;
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

  const handleRunCode = () => {
    // Assuming userCode contains the Python code entered by the user
    const encodedCode = encodeURIComponent(cppCode);

    // Construct the URL for the Python Tutor iframe
    const pythonTutorURL = `http://pythontutor.com/iframe-embed.html#code=${encodedCode}&cumulative=false&py=cpp_g%2B%2B9.3.0`;
    // Set the iframe source
    document.getElementById('pythonTutorIframe').src = pythonTutorURL;
  };
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const smartCompiler = async (e) => {
    e.preventDefault();
    setCheckingStatus(true);
    setConversation([
      ...conversation,
      { role: "user", content: "Code" + cppCode + "Question" + details[currentQuestionIndex].question },
    ]);
    setIsProcessing(true); // Set processing to true
  
    try {
      const response = await axios.post("http://localhost:8000/smartcompiler", {
        user_input: userInput,
        code: cppCode,
        question: details[currentQuestionIndex].question,
      });
  
      setConversation([
        ...conversation,
        { role: "user", content: userInput },
        { role: "assistant", content: response.data.message },
      ]);
  
      // Display the response message on the frontend
      setCompilerResponse(response.data.message);
    } catch (error) {
      console.error("Error sending message:", error);
  
      // Display an error message on the frontend
      setCompilerResponse("Submission failed. Please try again.");
    } finally {
      setIsProcessing(false); // Reset processing to false after response
    }
    compileCode();
    compiler = false;
    setCheckingStatus(false);
    setUserInput("");
  };
  
  // Add state for the compiler response
  const [compilerResponse, setCompilerResponse] = useState("");
  

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
                paddingBottom: "0px",
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

          <div style={{ textAlign: "center", marginLeft: "60px"}}>
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
              onClick={handleRunCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"130px" }}
              disabled={checkingStatus }
            >
              Debug
            </Button>

            <Button
              onClick={smartCompiler}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"90px" }}
              disabled={checkingStatus}
            >
              Submit
            </Button>

            <Button
              onClick={compileCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"60px" }}
              disabled={checkingStatus}
            >
              <AiOutlineDownload />
              &nbsp;Compile
            </Button>



            {details.length > 0 && currentQuestionIndex < details.length - 1 && (
                <Button onClick={nextQuestion} style={{marginLeft:"50px", marginTop:"20px"}}>Next</Button>

              
              )}
              
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <pre>
              {compilerResult && compilerResult.error && compiler? (
                <div>
                  <h3>Error:</h3>
                  <pre>{compilerResult.error}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.compile_status && compiler? (
                <div>
                  <h3>Error:</h3>
                  <pre>{compilerResult.compile_status}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.run_status && compiler? (
                <div>
                  <h3>Output:</h3>
                  <pre>{compilerResult.run_status.output}</pre>
                </div>
              ) : null}
            </pre>
                
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
          {compilerResponse && compilerResponse.includes("Yes") && compilerResult && compilerResult.run_status ? (
            <p>Great, Your answer is correct!</p>
          ) : compilerResponse && compilerResponse.includes("No") ? (
            <p>Your answer is wrong!</p>
          ) : compilerResponse && compilerResponse.includes("Yes") && compilerResult && compilerResult.compile_status ? (
            <p>You are on the right track but there are some issues! Please debug your code</p>
          ) : null}
          <pre>
            {/* ... (existing code) */}
          </pre>
        </div>



            </Col>
          </Row>
        </Container>
      </Container>
      <div style={{ justifyContent: 'left' }}>
        <iframe
          id="pythonTutorIframe"
          width="800"
          height="450"
          title="Python Tutor"
        ></iframe>
      </div>
    </div>
    
  );
}

export default Questions;
