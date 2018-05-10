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
        if(res.ok === true) {
            window.location = '/';
        }

        console.log(res.statusText);
    });

};


export {

    PrivateRoute,
    login,

}