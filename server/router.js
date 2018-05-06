const passport = require('passport');
const Auth = require('./controllers/auth');

const options = {
    session: false,
    // sucessRedirect: '/',
    // failureRedirect: '/login',
    // failureFlash: true
};

// For debugging
// const callback = (error, user, info) => {
//     console.log('done: ', error, user, info);
// };

const requireSignIn = passport.authenticate('local', options);
const requireAuth = passport.authenticate('jwt', options);


module.exports = (app) => {

    // Index
    app.get('/', (req, res) => {
        return res.send('Index page');
    });

    // Login
    app.post('/login', requireSignIn, (req, res) => {
        Auth.signin(req, res); 
        return res.send('auth success');
    });

    // Sign up
    app.post('/signup', Auth.signup);

    // Dashboard
    app.get('/dashboard', requireAuth, (req, res) => {
        return res.send('User profile');
    });

}