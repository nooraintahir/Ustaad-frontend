import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for holding error messages
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        // Redirect to the home page upon successful login
        navigate('/');
      } else {
        // Set error state with the error message
        setError(data.error);
      }
    } catch (error) {
      // Handle network or server errors
      setError("An error occurred during login. Please try again later.");
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
          <h1 className="project-heading mb-4 mt-3">Login</h1>
            <Form onSubmit={handleSubmit} className="login-form">
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
                <p className="text-white mt-2">Don't have an account? <Button variant="link" className="text-primary" onClick={handleSignUpClick}>Sign up</Button></p>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Login
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

export default Login;
