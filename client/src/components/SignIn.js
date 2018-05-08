import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../auth';


const SignIn = () => {

    const handleSubmit = (event) => {

        event.preventDefault();

        const formData = new FormData(event.target);

        login(formData);
        
    }

    return(

        <div>
            
            <div className="auth-form">

                <form className="form-group jumbotron text-center mt-5" onSubmit={ handleSubmit } >

                    <h5>SIGN IN</h5>
                
                    <br/>

                    <input className="form-control" name="email" type="text" placeholder="Username/Email" required />
                    
                    <br/>
                    
                    <input className="form-control" name="password" type="password" placeholder="Password" required />

                    <br/>

                    <button className="btn btn-info" type="submit" >Sign in</button>
                
                </form>

            </div>

        </div>

    );

}

export default SignIn;