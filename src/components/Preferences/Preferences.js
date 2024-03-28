import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { useNavigate } from "react-router-dom";
import "./Preferences.css";

function Preferences() {
    const [experienceLevel, setExperienceLevel] = useState(0);
    const [frequency, setFrequency] = useState(1);
    const [error, setError] = useState(""); // State for holding error messages
    const navigate = useNavigate();
  
    const handleExperienceLevelChange = (e) => {
      setExperienceLevel(parseInt(e.target.value));
      console.log(setExperienceLevel)
    };
  
    const handleFrequencyChange = (e) => {
      setFrequency(parseInt(e.target.value));
      console.log(setFrequency)
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const username = sessionStorage.getItem('username');
        const response = await fetch("http://localhost:8000/preferences", {
          method: 'POST',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ experienceLevel, frequency, username, // Provide the actual username and password
        })
        });
        
        const data = await response.json();
    
        if (response.ok && data.message === "Preferences saved successfully") {
          // Redirect to the home page upon successful preferences saving
          navigate('/');
        } else {
          // Set error state with the error message
          setError(data.error);
        }
      } catch (error) {
        // Handle network or server errors
        setError("An error occurred while saving preferences. Please try again later.");
      }
   
     };
  
    const handleSignUpClick = () => {
      navigate('/signup'); // Navigate to the signup page
    };
  
    return (
      <div className="login-container">
        <Container fluid className="login-background">
          <Row className="justify-content-center align-items-center">
            <Col md={6}>
            <h1 className="project-heading mb-4 mt-3">Enter Preferences</h1>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group controlId="experienceLevel" className="mb-4">
                  <Form.Label className="text-white">Experience Level</Form.Label>
                  <Form.Control
                    as="select"
                    value={experienceLevel}
                    onChange={handleExperienceLevelChange}
                  >
                    <option value={0}>Easy</option>
                    <option value={1}>Medium</option>
                    <option value={2}>Hard</option>
                  </Form.Control>
                </Form.Group>
  
                <Form.Group controlId="frequency" className="mb-4">
                  <Form.Label className="text-white">Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    value={frequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </Form.Control>
                </Form.Group>
  
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
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

export default Preferences;
