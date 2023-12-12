import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
    style={{ color: 'white' }}
      options={{
        strings: [
         "AI-Programming Tutor App"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50000000000000,
      }}
      
    />
  );
}

export default Type;
