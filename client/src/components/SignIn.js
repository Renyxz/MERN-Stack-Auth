import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../auth';
import { gLogo } from '../img/index';


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

                    <button className="btn btn-info form-control" type="submit" >Sign in</button>

                    <hr/>

                    <a className="btn google-signin-btn form-control" href="/api/auth/google">
                        <img className="g-icon" src={ gLogo } alt="g-logo" />
                        <span>Sign in with Google</span>
                    </a>
                
                </form>

            </div>

        </div>

    );

}

export default SignIn;