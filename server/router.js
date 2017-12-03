const Auth = require('./controllers/auth');
const passport = require('passport');
const passportService = require('./services/passport');


// Authenticate token
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.send({ msg: 'What\'s up?' });
    });

    app.post('/signin', requireSignin, Auth.signin);
    app.post('/signup', Auth.signup);
}