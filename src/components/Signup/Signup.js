import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State for holding error messages
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/signup/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, first_name, last_name, email })
      });
      
      const data = await response.json();

      if (response.ok && data.message === "Signup successful") {
        // Redirect to the home page upon successful signup
        sessionStorage.setItem('username', username);
        navigate('/preferences');
      } else {
        // Set error state with the error message
        setError(data.error);
      }
    } catch (error) {
      // Handle network or server errors
      setError("An error occurred during signup. Please try again later.");
    }
  };

  const handleLoginClick = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="Signup-container">
      <Container fluid className="Signup-background">
        <Row className="justify-content-center align-items-center mt-5">
          <Col md={6}>
            <h1 className="project-heading mb-4 mt-5">Signup</h1>
            <Form onSubmit={handleSubmit} className="signup-form">
              

              <Form.Group controlId="firstname" className="mb-4">
                <Form.Label className="text-white">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  value={first_name}
                  onChange={handleFirstnameChange}
                />
              </Form.Group>

              <Form.Group controlId="lastname" className="mb-4">
                <Form.Label className="text-white">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  value={last_name}
                  onChange={handleLastnameChange}
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

              <Form.Group controlId="username" className="mb-4">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <p className="text-white mt-2">Already have an account? <Button variant="link" className="text-primary" onClick={handleLoginClick}>Login</Button></p>

              <Button variant="primary" type="submit" className="mt-3">
                Signup
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
