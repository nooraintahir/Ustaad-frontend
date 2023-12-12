import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";



function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
         Topics <strong className="purple">covered </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here find the topics that have been covered.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Variables"
              description="Variables in C++ are
               containers for data in the memory. 
               The type of data you can store in them is dictated by their datatype.Variables can either be 
               initialized directly by the programmer or by taking input from the user.
                They can also be modified and updated throughout the program, and they play a crucial role in data manipulation and program logic."
             // ghLink="https://github.com/soumyajit4419/Chatify"
              //demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Arithmetic Operations"
              description="Arithmetic operations
               in C++ include basic math calculations like addition, 
               subtraction, multiplication, and division. C++ provides 
               various mathematical functions and operators for numeric 
               calculations and problem-solving." 
             // ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
              //demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Functions"
              description="Functions in C++ are reusable code blocks that perform specific tasks. They help organize and simplify code by encapsulating functionality into modular units. 
              Functions can take input, process it, and 
              return results, making them essential for code organization and reusability."
            //  ghLink="https://github.com/soumyajit4419/Editor.io"
              //demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="If-else Statements"
              description="If-else statements are used for decision-making in C++. Code inside
               the 'if' block is executed when a condition is true; otherwise, code inside the
               'else' block is executed. They are crucial for implementing logic and handling different scenarios in your program."
            //  ghLink="https://github.com/soumyajit4419/Plant_AI"
              //demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Loops"
              description="Loops in C++, such as 'for,' 'while,' and 'do-while,' allow you to repeat instructions multiple times. They are used for iterating through data 
              collections, performing repetitive
               tasks, and executing code until a specific condition is met or for a specified number of iterations."
             // ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Arrays"
              description="Arrays are data structures that store multiple values under a single name. Elements in an array are accessed by their index. Arrays are used for storing and managing 
              collections of data, like lists of numbers or strings. They can be initialized, modified, and accessed throughout the program."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
