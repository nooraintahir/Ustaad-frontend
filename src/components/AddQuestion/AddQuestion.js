import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { useNavigate } from "react-router-dom";
import "./AddQuestion.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState(""); // State for holding error messages
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/send-question/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, question, difficulty, topic })
      });
      
      const data = await response.json();

      if (response.ok && data.message === "Question sent successfully") {
        // Redirect to the home page upon successful question submission
        navigate('/');
      } else {
        // Set error state with the error message
        setError(data.error);
      }
    } catch (error) {
      // Handle network or server errors
      setError("An error occurred while sending the question. Please try again later.");
    }
  };

  return (
    <div className="question-container">
      <Container fluid className="question-background">
        <Row className="justify-content-center align-items-center mt-5">
          <Col md={6}>
            <h1 className="project-heading mb-4 mt-5">Send a question</h1>
            <Form onSubmit={handleSubmit} className="question-form">
              <Form.Group controlId="name" className="mb-4">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-4">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="question" className="mb-4">
                <Form.Label className="text-white">Question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your question"
                  value={question}
                  onChange={handleQuestionChange}
                />
              </Form.Group>

              <Form.Group controlId="difficulty" className="mb-4">
                <Form.Label className="text-white">Difficulty</Form.Label>
                <Form.Control
                  as="select"
                  value={difficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="topic" className="mb-4">
                <Form.Label className="text-white">Topic</Form.Label>
                <Form.Control
                  as="select"
                  value={topic}
                  onChange={handleTopicChange}
                >
                  <option value="">Select topic</option>
                  <option value="variables">Variables</option>
                  <option value="arithemetic_operations">Arithemetic Operations</option>
                  <option value="functions">Functions</option>
                  <option value="if_else">If-Else</option>
                  <option value="loops">Loops</option>
                  <option value="arrays">Arrays</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Send Question
              </Button>

              {error && <div className="text-danger mt-3">{error}</div>} {/* Render error message */}
            </Form>
            <Particle />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
