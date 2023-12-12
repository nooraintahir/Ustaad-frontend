import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
           <span className="purple">Ustaad, </span>
            your AI Programming Tutor. We're your coding companion,
             making learning fun and accessible. From <span className="purple">
             error detection</span> to <span className="purple">personalized lessons </span>
             we're here 24/7. Join us on a journey of <span className="purple">coding mastery!</span>
            <br />
            <br />
           What features do Ustaad provide?
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Integrated Compiler
            </li>
            <li className="about-activity">
              <ImPointRight /> Real-time Query Resolution
            </li>
            <li className="about-activity">
              <ImPointRight /> Coding Exercises
            </li>
            <li className="about-activity">
              <ImPointRight /> Personalized Lessons
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Coding wisdom at your fingertips with Ustaad!"{" "}
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
