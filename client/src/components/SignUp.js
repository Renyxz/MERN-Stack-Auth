import React from 'react';


const SignUp = () => {

    const handleSubmit = (event) => {

        event.preventDefault();

        const formData = new FormData(event.target);
        
        for (let [key, value] of formData.entries()) { 
            console.log(key, value);
        }

    }

    return(

        <div>
            
            <div className="auth-form">

                <form className="form-group jumbotron text-center mt-5" onSubmit={ handleSubmit } >

                    <h5>SIGN UP</h5>
                
                    <br/>

                    <input className="form-control" name="email" type="text" placeholder="Username/Email" required />
                    
                    <br/>
                    
                    <input className="form-control" name="password" type="password" placeholder="Password" required />

                    <br/>

                    <button className="btn btn-info" type="submit" >Sign up</button>
                
                </form>

            </div>

        </div>

    );

}

export default SignUp;