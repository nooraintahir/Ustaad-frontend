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
  const { difficulty } = useParams();
  const [width, setWidth] = useState(1200);
  const [cppCode, setCppCode] = useState("");
  const [compilerResult, setCompilerResult] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  let compiler = true;

  const fetchQuestions = async () => {
    try {
      const response = await axios.post("http://localhost:8000/userquestions", {
        topic: "Arrays",
        difficulty: "Easy",
      });
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
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
  fetchQuestions()

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
              highlightActiveLine={true}
              showGutter={true}
              showPrintMargin={true}

            />
          </div>
          <div>

          <Button
              onClick={handleRunCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"130px" }}
              disabled={checkingStatus }
              title="Opens a debugger to help you understand the code better by parsing it line by line."
            >
              Debug
            </Button>

            <Button
              onClick={smartCompiler}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"90px" }}
              disabled={checkingStatus}
              title="Compiles the code and submits it to check if it is correct."

            >
              Submit
            </Button>

            <Button
              onClick={compileCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px", marginRight:"60px" }}
              disabled={checkingStatus}
              title="Compiles the code and displays the output."
            >
              <AiOutlineDownload />
              &nbsp;Compile
            </Button>


              
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <pre>
              {compilerResult && !compilerResult.cpuTime && compiler? (
                <div >
                  <h3>Error:</h3>
                  <pre style={{ textAlign:"left"}}>{compilerResult.output}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.cpuTime &&compiler? (
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

export default Compiler;
