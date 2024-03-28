import React, { useState, useEffect } from 'react';

const LessonPlan = () => {
    const [lessonPlanInfo, setLessonPlanInfo] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/preferences", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'hassang', // Provide the actual username and password
                    password: '1234'
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // Check if lesson plan information is available in the response
                // if (data && data.lesson_plan_info) {
                //     // Update the state with lesson plan information
                //     setLessonPlanInfo(data.lesson_plan_info);
                //     console.log(data.lesson_plan_info)
                // } else {
                //     console.error('Error: Lesson plan information not available');
                // }
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
        <div>
        
            {/* Render lesson plan information */}
            {//lessonPlanInfo && (
                // <div>
                //     <h2>Lesson Plan Information</h2>
                //     <p>Date Only: {lessonPlanInfo.date_only}</p>
                //     <p>Topic: {lessonPlanInfo.topic}</p>
                //     <p>Difficulty: {lessonPlanInfo.difficulty}</p>
                //     <p>Questions to Attempt: {lessonPlanInfo.questions_to_attempt}</p>
                //     <p>Questions Attempted: {lessonPlanInfo.questions_attempted}</p>
                // </div>
           // )}
            }
        </div>
    );
};

export default LessonPlan;
