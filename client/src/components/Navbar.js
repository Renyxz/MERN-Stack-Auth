import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

    return(

        <div>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <Link className="navbar-brand" to="/">
                    <i className="fab fa-react mr-2"></i>
                    MERN Auth
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">

                    <ul className="navbar-nav ml-auto">
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Sign in</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign up</Link>
                        </li>

                    </ul>
                    
                </div>

            </nav>

        </div>

    );

}

export default Navbar;