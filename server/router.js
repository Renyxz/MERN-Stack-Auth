const passport = require('passport');
const Auth = require('./controllers/auth');

const options = {
    session: false,
};

const googleAuthOptions = {
    scope: ['https://www.googleapis.com/auth/plus.login'],
    failureRedirect: '/api/auth/google',
    session: false,
};

// For debugging
// const callback = (error, user, info) => {
//     console.log('done: ', error, user, info);
// };

const requireSignIn = passport.authenticate('local', options);
const requireAuth = passport.authenticate('jwt', options);
const requireGoogleOAuth = passport.authenticate('google', googleAuthOptions);
// const requireGitHubOAuth = passport.authenticate('github');


module.exports = (app) => {

    // Index
    app.get('/api', (req, res) => {
        return res.send({ message: 'Index page' });
    });

    // Login
    app.post('/api/login', requireSignIn, (req, res) => {
        Auth.signin(req, res); 
        return res.send({ message: 'auth success' });
    });

    
    // Google OAuth
    app.get('/api/auth/google', requireGoogleOAuth);

    app.get('/api/auth/google/callback', requireGoogleOAuth, Auth.googleSignIn);


    // GitHub OAuth
    // app.get('/api/auth/github', requireGitHubOAuth);


    // Sign up
    app.post('/api/signup', Auth.signup);

    // Dashboard
    app.get('/api/user', requireAuth, (req, res) => {
        return res.send(req.user);
    });

}