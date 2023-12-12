import axios from 'axios';
import React from 'react';


class frontend extends React.Component{

    state = {details: [],}

    componentDidMount(){

        let data;
        axios.get('http://localhost:8000')
        .then(res => {
            data = res.data;
            this.setState({
                details: data
            });
        })
        .catch(err => { })

    }
     
    
    render(){
        return(
            <div>
                <header> GOT IT FINALLY </header>
                <hr></hr>
                {this.state.details.map((output, id) => (
                    <div key={id}>
                     <div>
                        <h2>{output.title}</h2>
                        <h3>{output.description}</h3>
                        <h4>{output.question}</h4>
                        </div>
                     </div>   
                ))}


            </div>



        )
    }

}

export default frontend;