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
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compilerResponse, setCompilerResponse] = useState("");

  useEffect(() => {
    setWidth(window.innerWidth);
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const name = sessionStorage.getItem('username');
      const response = await axios.post("http://localhost:8000/userquestions", {
        topic: "Arrays",
        difficulty: "Easy",
        username: name,
      });
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  
  const handleRunCode = () => {
    // Assuming userCode contains the Python code entered by the user
    const encodedCode = encodeURIComponent(cppCode);

    // Construct the URL for the Python Tutor iframe
    const pythonTutorURL = `http://pythontutor.com/iframe-embed.html#code=${encodedCode}&cumulative=false&py=cpp_g%2B%2B9.3.0`;
    // Set the iframe source
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
    setConversation([
      ...conversation,
      { role: "user", content: "Code" + cppCode + "Question" + details[currentQuestionIndex].question },
    ]);
    setIsProcessing(true);

    try {
      await axios.post("http://localhost:8000/update-score", {
        questionId: details[currentQuestionIndex].id,
      });
  
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
  
      setCompilerResponse(response.data.message);
    } catch (error) {
      console.error("Error sending message:", error);
      setCompilerResponse("Submission failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
    compileCode();
    setCheckingStatus(false);
    setUserInput("");
  };

  return (
    <div>
      <Container fluid className="qcontent">
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={7}>
            <div className="centered-content">
              <h3>{question}</h3>
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
            {/* Buttons and compiler output */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Compiler;
