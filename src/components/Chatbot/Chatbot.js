import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import axios from "axios";

function formatGptResponse(response) {
  const paragraphs = response.split("\n");

  const formattedParagraphs = [];
  let skipParagraph = false;

  paragraphs.forEach((paragraph, index) => {

    // Check if the paragraph is a bullet point
    if (paragraph.includes("- ")) {
      const bulletPoints = paragraph.split("\n").map((point, i) => (
        <li key={i}>{point.replace(/^- */, "").trim()}</li>
      ));
      formattedParagraphs.push(<ul key={index}>{bulletPoints}</ul>);
      skipParagraph = false;
    }
    
    // Check if the paragraph is a code block
    else if (paragraph.includes("```cpp") || paragraph.includes("```C++")) {
    // Find the index of the closing ``` tag
    const closingIndex = paragraphs.findIndex((p, i) => i > index && p.includes("```"));

    // Extract the code block content
    const codeBlockContent = paragraphs.slice(index + 1, closingIndex).join("\n");

    // Highlight code block in light gray box with light blue text
    formattedParagraphs.push(
      <div key={index} style={{ backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '5px',  textAlign: 'justify', marginBottom: "10px" }}>
        <code style={{ whiteSpace: 'pre-line',  textAlign: 'justify', color: "#423fa6"}}>{codeBlockContent}</code>
      </div>
    );

    skipParagraph = true;
   }

    // Check if the paragraph contains bold text
    else if (paragraph.includes("**")) {
      // Split the paragraph at each occurrence of "**" to identify bold text
      const boldText = paragraph.split("**").map((text, i) => (
        i % 2 === 0 ? <span key={i}>{text}</span> : <strong key={i}>{text}</strong>
      ));
      formattedParagraphs.push(<p key={index}>{boldText}</p>);
      skipParagraph = false;
    }

    // Check if the paragraph is a heading
    else if (paragraph.includes("####")) {
      formattedParagraphs.push(<h4 key={index}>{paragraph.replace(/#/g, "").trim()}</h4>);
      skipParagraph = false;
    }

    else if (paragraph.includes("###")) {
      formattedParagraphs.push(<h3 key={index}>{paragraph.replace(/#/g, "").trim()}</h3>);
      skipParagraph = false;
    }



    // Default: render as a regular paragraph
    else if (!skipParagraph) {
      formattedParagraphs.push(<p key={index} style={{ textAlign: 'justify' }}>{paragraph}</p>);
    }
  });

  return formattedParagraphs;
}



function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatWindowRef = useRef(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setConversation([...conversation, { role: "user", content: userInput }]);
    setIsProcessing(true); // Set processing to true

    try {
      const response = await axios.post("http://localhost:8000/chatbot", { user_input: userInput });
      setConversation([...conversation, { role: "user", content: userInput }, { role: "assistant", content: response.data.message }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsProcessing(false); // Reset processing to false after response
    }

    setUserInput("");
  };

  useEffect(() => {
    if (!hasWelcomed) {
      // Initial welcome message
      const welcomeMessage = "Welcome Student! What can I help you in C++ language";

      setConversation([
        ...conversation,
        { role: "assistant", content: welcomeMessage },
      ]);

      setHasWelcomed(true);
    }

    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversation]);


  return (
    <div>
      <Container fluid className="chatbot">
        <Particle />
        <Row style={{ position: "relative", marginTop: "100px" }}>
          <Col md={6}>
            <div
              ref={chatWindowRef}
              style={{
                border: "1px solid #ddd",
                height: "460px",
                overflowY: "auto",
                padding: "15px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                position: "relative",
                width: "800px",
                marginLeft: "280px"
              }}
              className="chat-window"
            >
              {conversation.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: message.role === "user" ? "#89aff0" : "#cc89f0",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      maxWidth: "80%",

                    }}
                  >
                    {message.role === "assistant" && formatGptResponse(message.content)}
                    {message.role !== "assistant" && message.content}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "10px", marginLeft: "280px", display: "flex", width: "820px" }}>
              <Form onSubmit={handleSubmit} className="message-input row" style={{ flex: 1, marginRight: "10px" }}>
                <div style={{ display: "flex", width: "100%" }}>
                  <Form.Group controlId="userInput" style={{ margin: 0, flex: 1 }}>
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={userInput}
                      onChange={handleInputChange}
                      style={{ width: "100%" }}
                      disabled={isProcessing}
                    />
                  </Form.Group>
                  <div style={{ marginLeft: "10px" }}>
                    <Button variant="primary" type="submit" disabled={isProcessing}>
                      Send
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chatbot;