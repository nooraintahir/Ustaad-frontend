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
import 'ace-builds/src-noconflict/ext-language_tools';

function Compiler() {
  const [details, setDetails] = useState([]);
  const [question, setQuestion]=useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { difficulty, topic } = useParams();
  const [width, setWidth] = useState(1200);
  const [cppCode, setCppCode] = useState("");
  const [compilerResult, setCompilerResult] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compilerResponse, setCompilerResponse] = useState("");
  const username = sessionStorage.getItem('username');



  useEffect(() => {
    setWidth(window.innerWidth);
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post("http://localhost:8000/userquestions", {
        topic,
        difficulty,
        username,
      });
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  
  const handleRunCode = () => {
    const encodedCode = encodeURIComponent(cppCode);
    const pythonTutorURL = `http://pythontutor.com/iframe-embed.html#code=${encodedCode}&cumulative=false&py=cpp_g%2B%2B9.3.0`;
    document.getElementById('pythonTutorIframe').src = pythonTutorURL;
  };

  const compileCode = async () => {
    setCheckingStatus(true);

    try {
      const response = await axios.post("http://localhost:8000/compiler", {
        code: cppCode,
      });

      if (response.status === 200) {
        const data = response.data;
        setCompilerResult(data);
        setCheckingStatus(false);
        console.log("Response Data:", data);
      } else {
        setCompilerResult({ error: "Compilation failed. Please try again." });
      }
    } catch (error) {
      console.error("Error compiling code:", error);
    }
  };

  const smartCompiler = async (e) => {
    e.preventDefault();
    setCheckingStatus(true);
    const userInputString = userInput.toString(); // Convert userInput to string
    const updatedUserInput = [
      { role: "user", content: "Question" + question + "Code" + cppCode },
    ];
    setUserInput(updatedUserInput);
    setIsProcessing(true);
  
    try {
      compileCode();
      const response = await axios.post("http://localhost:8000/smartcompiler", {
        user_input: userInputString, // Send userInputString instead of userInput
      });
  
      setCompilerResponse(response.data.message);
      if (response.data.message.includes("Yes")) {
        console.log(question, topic, difficulty, username)
        await axios.post("http://localhost:8000/update-score", {
          topic,
          difficulty,
          username,
          question
        });
    }
    } catch (error) {
      console.error("Error sending message:", error);
      setCompilerResponse("Submission failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setCheckingStatus(false);
      setUserInput(updatedUserInput); // Reset userInput with updatedUserInput
      
    }
  };
  
  
  return (
    <div>
      <Container fluid className="qcontent">
        <Row  style={{ justifyContent: "center", padding:"10px",marginLeft: "20px", marginRight: "20px" }}>
        <Col md={6}>
            <div className="centered-content">
              <h4>{question}</h4>
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
                highlightActiveLine={true}
                showGutter={true}
                showPrintMargin={true}
              />
              <Button
              onClick={handleRunCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"100px" }}
              disabled={checkingStatus }
              title="Opens a debugger to help you understand the code better by parsing it line by line."
            >
              Debug
            </Button>

            <Button
              onClick={smartCompiler}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"100px" }}
              disabled={checkingStatus}
              title="Compiles the code and submits it to check if it is correct."

            >
              Submit
            </Button>

            <Button
              onClick={compileCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px" , marginRight:"10px"}}
              disabled={checkingStatus}
              title="Compiles the code and displays the output."
            >
              Compile
            </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <pre>
                {compilerResult && !compilerResult.cpuTime ? (
                  <div >
                    <h3>Error:</h3>
                    <pre style={{ textAlign:"left"}}>{compilerResult.output}</pre>
                  </div>
                ) : null}
                {compilerResult && compilerResult.cpuTime ? (
                  <div>
                    <h3>Output:</h3>
                    <pre style={{ textAlign:"left"}}>{compilerResult.output}</pre>
                  </div>
                ) : null}
              </pre>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {compilerResponse && compilerResponse.includes("Yes") && compilerResult && compilerResult.run_status ? (
                <p>Great, Your answer is correct!</p>
              ) : compilerResponse && compilerResponse.includes("No") ? (
                <p>Your answer is wrong!</p>
              ) : compilerResponse && compilerResponse.includes("Yes") && compilerResult && !compilerResult.cpuTime ? (
                <p>You are on the right track but there are some issues! Please debug your code</p>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
      <div style={{ justifyContent: "center" }}>
        <iframe
          id="pythonTutorIframe"
          width="800"
          height="450"
          title="Python Tutor"
        ></iframe>
            <Particle/>

      </div>
    </div>

  );
}

export default Compiler;
