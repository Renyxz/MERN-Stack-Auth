import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../auth';


const Navbar = () => {

    const isAuthenticated = window.sessionStorage.auth;
    const authVisibility = isAuthenticated ? 'auth-hide' : 'auth-show';
    const profileVisibility = isAuthenticated ? 'profile-show' : 'profile-hide';

    return(

        <div>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <Link className="navbar-brand" to="/">
                    <i className="fab fa-react mr-2"></i>
                    MERN Auth
                </Link>

                <button className={ `navbar-toggler ${ authVisibility }` } type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">

                    <ul className={ `navbar-nav ml-auto ${ authVisibility }` }>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Sign in</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign up</Link>
                        </li>

                    </ul>
                    
                </div>

                <div className={ `profile btn-group ${ profileVisibility }` }>
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="img-fluid rounded-circle" width="35" height="35" src="http://via.placeholder.com/150x150" alt="profile"/>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/dashboard" >
                            Dashboard
                        </Link>
                        
                        <button className="dropdown-item" type="button" onClick={ () => auth.signout() }>
                            Sign out
                        </button>
                    </div>
                </div>

            </nav>

        </div>

    );

}

export default Navbar;