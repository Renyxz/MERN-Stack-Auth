import React from 'react';
import { Route, Redirect } from 'react-router-dom';



// Private route
const isAuthenticated = window.sessionStorage.token;

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
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
        window.location = '/';
    })
    .catch( error => {
        console.log(error);
    });

};


// Sign out
const signout = () => {

    window.sessionStorage.clear();
    window.location = '/';

};


export {

    PrivateRoute,
    jwtAuthentication,
    login,
    signout,

}