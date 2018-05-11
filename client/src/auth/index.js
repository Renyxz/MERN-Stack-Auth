import React from 'react';
import { Route, Redirect } from 'react-router-dom';



// Authentication
const jwtAuthentication = (token) => {

    const promise = fetch('/api/user', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        }
    })
    .then( res => {
        return res.json(); 
    })
    .catch( error => {
        console.log(error);
    });

    return promise;
};



// Auth checker
const auth = {
    
    isAuthenticated: false,

    authenticate() {
        
        const token = window.sessionStorage.token;
    
        const promise = jwtAuthentication(token);
        
        promise.then( res => {
            // console.log('isAuth jwt: ', res);
            if(!res){
                this.isAuthenticated = false;
                window.sessionStorage.clear();
            } else {
                this.isAuthenticated = true;
            } 
        });

    },

    // Sign out
    signout() {

        window.sessionStorage.clear();
        window.location = '/';

    }

};



// Private route
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        window.sessionStorage.auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);



// Login
const login = (formData) => {
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          })
    })
    .then( res => {
        return res.json();
    })
    .then( res => {
        window.sessionStorage.setItem('token', res.token);
        window.sessionStorage.setItem('auth', true);
        window.location = '/';
    })
    .catch( error => {
        console.log(error);
    });

};



export {

    jwtAuthentication,
    auth,
    PrivateRoute,
    login,

}