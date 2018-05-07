import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class App extends Component {
  render() {
    return (

      <div className="container landing">
        
        <div className="jumbotron text-center">

          <h1>MERN Stack Authentication App</h1>

          <br/>
          <br/>

          <i className="fab fa-react mr-5"></i>
          <i className="fab fa-node-js"></i>

          <br/>
          <br/>
          <br/>

          <p className="lead">
            MongoDB - Express - React.js - Node.js
          </p>

          <br/>
          <br/>

          <Link className="landing-btn" to="/signin">GET STARTED</Link>

        </div>

      </div>
  
);
  }
}

export default App;
