import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Particle from "../Particle";
import { useNavigate } from "react-router-dom";
import './ProgressTracking.css'; 

const ProgressTracking = ({currentStep, totalSteps}) => {
    const [variablesData, setVariablesData] = useState(null);
    const [attemptedCounts, setAttemptedCounts] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(attemptedCounts);
        if (attemptedCounts) {
            createChart(attemptedCounts);
            createChartArithmetic(attemptedCounts);
            createChartFunctions(attemptedCounts);
            createChartIfelse(attemptedCounts);
            createChartLoops(attemptedCounts);
            createChartArrays(attemptedCounts);
        }
    }, [attemptedCounts]);


//     fetch('http://localhost:8000/login/')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Access the attempted counts JSON data
//     const attemptedCounts = data && data.attempted_counts ? JSON.parse(data.attempted_counts) : null;
    
//     if (attemptedCounts) {
//       // Now you can use the attemptedCounts object in your frontend code
//       console.log(attemptedCounts);
//       // You can process the data further here
//     } else {
//       console.error('Error: Attempted counts data not available');
//     }
//   })
//   .catch(error => console.error('Error:', error));
    // useEffect(() => {
    //     // Fetch data from Django backend
    //     axios.post("http://localhost:8000/login/", {
    //         // Provide necessary data for authentication if required
    //          //username: 'zainab',
    //          //password: '1234'
    //     })
    //     .then(response => {
    //         // Extract variables data from response
    //         const variablesData = response.data.variables;
    //         setVariablesData(variablesData);
    //         console.log(variablesData)
    //         // Call function to create chart
    //         createChart(variablesData);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // }, []);
    // try {
    //     // Send a request to the Django backend to authenticate and fetch variables data
    //     const response = await axios.post("http://localhost:8000/api/login/", {
    //       username: 'your_username',
    //       password: 'your_password'
    //     });
      
    //     // Extract variables data from the response
    //     const variablesData = response.data.variables;
      
    //     // Now you can use variablesData to perform further operations, such as displaying in a chart
      
    //     console.log(variablesData); // For testing purposes, you can log the data to see it in the console
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
      
    const createChart = (data) => {
        // Use Chart.js to create a chart
        if (data && data.Variables) {
            const variablesData = data.Variables; // Extracting Variables data
    
            const ctx = document.getElementById('myChart').getContext('2d');
           
            Chart.getChart(ctx)?.destroy();

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(variablesData),
                    datasets: [{
                        label: 'Attempted Counts for Variables',                      
                        data: Object.values(variablesData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', // Brightened color
                            'rgba(54, 162, 235, 0.6)',  // Brightened color
                            'rgba(255, 206, 86, 0.6)'   // Brightened color
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Darkened border color
                            'rgba(54, 162, 235, 1)',  // Darkened border color
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            ticks: {
                                stepSize: 2,
                                color: 'white'
                               
                            }
                            
                            
                        },
                        x: {
                            ticks: {
                                color: 'white'
                            }
                           
                        }
                      

                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Make legend label text color white
                            }
                        },
                        shadow: {
                            enabled: true // Enable shadow for bars
                        }
                    }
                }


            });
        }
    };

    const createChartArithmetic = (data) => {
        // Use Chart.js to create a chart
        if (data && data.Arithmetic) {
            const ArithmeticData = data.Arithmetic; // Extracting Variables data
    
            const ctx = document.getElementById('myChart2').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(ArithmeticData),
                    datasets: [{
                        label: 'Attempted Counts for Arithmetic',
                        data: Object.values(ArithmeticData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', // Brightened color
                            'rgba(54, 162, 235, 0.6)',  // Brightened color
                            'rgba(255, 206, 86, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Darkened border color
                            'rgba(54, 162, 235, 1)',  // Darkened border color
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,

                            ticks: {
                                stepSize: 2,
                                color:'white', // Set the step size between each tick
                                // Add more customization as needed
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                           
                        }
                      

                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Make legend label text color white
                            }
                        },
                        shadow: {
                            enabled: true // Enable shadow for bars
                        }
                    }
                }
            });
        }
    };

    const createChartFunctions = (data) => {
        // Use Chart.js to create a chart
        if (data && data.Functions) {
            const FunctionData = data.Functions; // Extracting Variables data
    
            const ctx = document.getElementById('myChart3').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(FunctionData),
                    datasets: [{
                        label: 'Attempted Counts for Functions',
                        data: Object.values(FunctionData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', // Brightened color
                            'rgba(54, 162, 235, 0.6)',  // Brightened color
                            'rgba(255, 206, 86, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Darkened border color
                            'rgba(54, 162, 235, 1)',  // Darkened border color
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,

                            ticks: {
                                stepSize: 2,
                                color:'white', // Set the step size between each tick
                                // Add more customization as needed
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                           
                        }
                      

                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Make legend label text color white
                            }
                        },
                        shadow: {
                            enabled: true // Enable shadow for bars
                        }
                    }
                }
            });
        }
    };

    const createChartIfelse = (data) => {
        // Use Chart.js to create a chart
        if (data && data['If-else']) {
            const IfelseData = data['If-else']; // Extracting Variables data
    
            const ctx = document.getElementById('myChart4').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(IfelseData),
                    datasets: [{
                        label: 'Attempted Counts for If-else',
                        data: Object.values(IfelseData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', // Brightened color
                            'rgba(54, 162, 235, 0.6)',  // Brightened color
                            'rgba(255, 206, 86, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Darkened border color
                            'rgba(54, 162, 235, 1)',  // Darkened border color
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,

                            ticks: {
                                stepSize: 2,
                                color:'white', // Set the step size between each tick
                                // Add more customization as needed
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                           
                        }
                      

                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Make legend label text color white
                            }
                        },
                        shadow: {
                            enabled: true // Enable shadow for bars
                        }
                    }
                }
            });
        }
    };

    const createChartLoops = (data) => {
        // Use Chart.js to create a chart
        if (data && data.Loops) {
            const LoopsData = data.Loops; // Extracting Variables data
    
            const ctx = document.getElementById('myChart5').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(LoopsData),
                    datasets: [{
                        label: 'Attempted Counts for Loops',
                        data: Object.values(LoopsData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', // Brightened color
                            'rgba(54, 162, 235, 0.6)',  // Brightened color
                            'rgba(255, 206, 86, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Darkened border color
                            'rgba(54, 162, 235, 1)',  // Darkened border color
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,

                            ticks: {
                                stepSize: 2,
                                color:'white', // Set the step size between each tick
                                // Add more customization as needed
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                           
                        }
                      

                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Make legend label text color white
                            }
                        },
                        shadow: {
                            enabled: true // Enable shadow for bars
                        }
                    }
                }
            });
        }
    };

    const createChartArrays = (data) => {
        // Use Chart.js to create a chart
        if (data && data.Arrays) {
            const Arraysdata = data.Arrays; // Extracting Variables data
    
            const ctx = document.getElementById('myChart6').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(Arraysdata),
                    datasets: [{
                        label: 'Attempted Counts for Arrays',
                        data: Object.values(Arraysdata),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)', // Brightened color
                            'rgba(54, 162, 235, 0.6)',  // Brightened color
                            'rgba(255, 206, 86, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Darkened border color
                            'rgba(54, 162, 235, 1)',  // Darkened border color
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,

                            ticks: {
                                stepSize: 2,
                                color:'white', // Set the step size between each tick
                                // Add more customization as needed
                            }
                        },

                        x: {
                            ticks: {
                                color: 'white'
                            }
                           
                        }
                      

                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Make legend label text color white
                            }
                        },
                        shadow: {
                            enabled: true // Enable shadow for bars
                        }
                    }
                }
            });
        }
    };
    const fetchData = async () => {

        
            try {
                const response = await fetch("http://localhost:8000/login/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: 'zainab', // Provide the actual username and password
                        password: '1234'
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    // Check if attempted counts data is available in the response
                    if (data && data.attempted_counts) {
                        // Update the state with attempted counts data
                        setAttemptedCounts(JSON.parse(data.attempted_counts));
                    } else {
                        console.error('Error: Attempted counts data not available');
                    }
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
       
      
      };
      

    return (
        <div>
            <div>
           <h2 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '520px', left: '22%', transform: 'translateX(-22%)' }}>Variables</h2>
        <div className="chart-container">
        <canvas id="myChart" width="400" height="400"></canvas>
       
        </div>
        </div>
       
        <div>
        <h2 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '-40px', marginLeft: '-23%', transform: 'translateX(23%)' }}>Arithmetic</h2>
        </div>
        <div className="chart-containerarithmetic">

  <canvas id="myChart2" width="400" height="400"></canvas>
    </div>
   

        <div>
        <h2 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '520px', left: '22%', transform: 'translateX(-22%)' }}>Functions</h2>

    <div className="chart-Function">

  <canvas id="myChart3" width="400" height="400"></canvas>
    </div>
    </div>

    <div>
    <h2 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '-40px', marginLeft: '-23%', transform: 'translateX(23%)' }}>If-else Statements</h2>

    <div className="chart-Ifelse">
  <canvas id="myChart4" width="400" height="400"></canvas>
    </div>
    </div>

    <div>
        <h2 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '520px', left: '22%', transform: 'translateX(-22%)' }}>Loops</h2>

    <div className="chart-Loops">

  <canvas id="myChart5" width="400" height="400"></canvas>
    </div>
    </div>

    <div>
    <h2 style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '-40px', marginLeft: '-23%', transform: 'translateX(23%)' }}>Arrays</h2>

    <div className="chart-Arrays">
  <canvas id="myChart6" width="400" height="400"></canvas>
    </div>
    </div>
    

 <div>
    <Particle />
 </div>
</div>

       

          
 
         
       
      
     
     
    );
};

export default ProgressTracking;

/* <div>
{attemptedCounts && (
  <div>
    <h2>Attempted Counts</h2>
    <pre>{JSON.stringify(attemptedCounts, null, 2)}</pre>
  </div>
)}
</div> */