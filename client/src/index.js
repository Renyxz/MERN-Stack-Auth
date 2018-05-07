import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './styles/vendor/bootswatch.css';
import './styles/index.css';
import './styles/App.css';

// Components
import Navbar from './components/Navbar';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Router
import { BrowserRouter, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    
    <BrowserRouter>
        <div>
            <Route path="/" component={ Navbar } />    
            <Route exact path="/" component={ App } />
            <Route exact path="/signin" component={ SignIn } />
            <Route exact path="/signup" component={ SignUp } />
        </div>    
    </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();
