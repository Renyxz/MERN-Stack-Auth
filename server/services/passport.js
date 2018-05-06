const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('../config');
const User = require('../models/user');


// Create local strategy
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy( localOptions, (username, password, done) => {
    // Verify username & password
    // Filter email address in case of any uppercase letter, otherwise it will be unauthorized.
    User.findOne({ email: username }, (error, user) => {
        
        // In case of any error:
        if(error) {
            // console.log('Error: ', error);
            return done(error);
        }

        // If no user is found with the email provided, call done with false.
        if(!user) {
            // console.log('Invalid email');
            return done(null, false, { message: 'Invalid email' });
        }

        // If password matches, call done with 'user'
        user.comparePassword(password, (error, isMatch) => {
            
            // In case of any error:
            if (error) return done(error);

            // If password is not matched:
            if (!isMatch) return done(null, false);

            // Otherwise, return done with 'user':
            return done(null, user);

        });

    });

});



// Create JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JWTStrategy(jwtOptions, (jwt_payload, done) => {

    // Check from payload for existing user ID in database    
    User.findOne({ _id: jwt_payload.sub }, (error, user) => {
        
        // console.log('JWT payload: ', jwt_payload);
        
        // In case of any error:
        if(error) {
            return done(error, false);
        }

        // If user ID exists, call 'done' with the user:
        (user) ? done(null, user)

        // Otherwise, call 'done' without a user object:
        : done(null, false);

        // console.log('JWT Login - User found: ', user);

    });

});




// Session - use when strategy session is set to true
// passport.serializeUser( (user, done) => {

//     done(null, user.id);

// });

// passport.deserializeUser( (id, done) => {

//     User.findById(id, (error, user) => {
//         done(error, user);
//     });

// });



// Assign JWT Strategies to passport
passport.use(localLogin);
passport.use(jwtLogin);
