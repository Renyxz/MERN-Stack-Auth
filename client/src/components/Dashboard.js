import React, { Component } from 'react';
import { jwtAuthentication } from '../auth';

class Dashboard extends Component {

    constructor(Props) {
        super(Props);

        this.state = {
            userData: {}
        }
    }

    componentWillMount() {

        const token = window.sessionStorage.token; 
        
        const promise = jwtAuthentication(token);

        promise.then( res => {
            console.log('jwtAuth: ', res);
            this.setState({
                userData: res
            });
        });
      
        promise.catch( error => {
            console.log(error);
        });

    }
    
    render() {
        // console.log(this.state.userData);
        const userData = this.state.userData;

        return(
    
            <div className="container">
    
                <div className="row">
                    
                    <div className="col-lg-3">
                        
                    <div className="card mt-3 p-3">
                        <img className="img-fluid rounded" width="100%" height="100%" src="http://via.placeholder.com/150x150" alt="Card cap" />
                        <div className="mt-3">
                            <p className="card-text">
                                Name
    
                                <br/>
    
                                { userData.email }
    
                                <br/>
                                <br/>
    
                                Memeber since: 
                            </p>
                        </div>
                    </div>
    
                    </div>
    
                    <div className="col-lg-9">
    
                    </div>
    
                </div>
    
            </div>
    
        );

    }

}

export default Dashboard;