const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');


// Generate token for user
function userToken(user) {
    // console.log('Generate token for USER: ', user);

    const timestamp = new Date().getTime();

    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);

}



// User signin
const signin = (req, res) => {
    const user = req.user;

    // On email and password authenticated(Passport Local Strategy), assign token to user.
    const token = userToken(user);

    res.send({ token: token });

}



// User registration
const signup = (req, res, next) => {
    // Data from the request
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);

    // Check for existing user by email.
    User.findOne({ email: email }, (error, existingUser) => {
        if (error) return next(error);
        
        // If user already exist, return error.
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use.' });
        }

        // Check for email & password
        if (!email || !password) {
            return res.status(422).send({ error: 'You must enter e-mail and password.' });
        }

   
        // If not an existing user, create and save record.
        const user = new User({
            email: email,
            password: password
        });
    
        user.save( (error) => {
            if (error) return next(error);

            // Respond to request indicating user is created.
            res.json({ token: userToken(user) });
            
        });
   
    });

}



module.exports = {
    signin,
    signup
}