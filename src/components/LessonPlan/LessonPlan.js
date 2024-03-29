import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { useNavigate } from "react-router-dom";
//import ProjectCard from "./ProjectCards";
import Particles from "react-tsparticles";
import "./Lessonplan.css"
import { DiTravis } from "react-icons/di";
const LessonPlan = () => {
    const [lessonPlanInfo, setLessonPlanInfo] = useState(null);

    const fetchData = async () => {
        try {
            const name = sessionStorage.getItem('username');
            const response = await fetch("http://localhost:8000/lessonplan", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name, // Provide the actual username and password

                })
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // Check if lesson plan information is available in the response
                if (data && data.lesson_plan_info) {
                    // Update the state with lesson plan information
                    setLessonPlanInfo(data.lesson_plan_info);
                    console.log(data.lesson_plan_info)
                } else {
                    console.error('Error: Lesson plan information not available');
                }
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Fetch lesson plan data when the component mounts
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once


    return (
        <div className="login-container" style={{marginTop:"30px"}}>
          <Container fluid className="login-background">
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
              <h1 className="project-heading mb-4 mt-5" >Today's 
              <strong className="purple">  Lesson Plan </strong></h1>
              

            <div  style={{justifyContent:"center", marginLeft:"20%", marginTop:"10%"}}>

            {lessonPlanInfo && (
                     <div className="tech-icons" style={{justifyContent:"center"}}>
                     
                     
                    <p style={{ fontSize: '0.5em' }}>Topic: {lessonPlanInfo.topic}</p>
                    <p style={{ fontSize: '0.5em' }}>Difficulty: {lessonPlanInfo.difficulty}</p>
                    <p style={{ fontSize: '0.5em' }}>Questions to Attempt: {lessonPlanInfo.questions_to_attempt}</p>
                    <p style={{ fontSize: '0.5em' }}>Questions Attempted: {lessonPlanInfo.questions_attempted}</p>

                 </div>
                        )}
            </div>

    
                <Particle />
    
              </Col>
            </Row>
          </Container>
        </div>
      );

    };
export default LessonPlan;
