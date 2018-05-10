const passport = require('passport');
const Auth = require('./controllers/auth');

const options = {
    session: false,
};

// For debugging
// const callback = (error, user, info) => {
//     console.log('done: ', error, user, info);
// };

const requireSignIn = passport.authenticate('local', options);
const requireAuth = passport.authenticate('jwt', options);


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

    // Sign up
    app.post('/api/signup', Auth.signup);

    // Dashboard
    app.get('/api/user', requireAuth, (req, res) => {
        return res.send(req.user);
    });

}