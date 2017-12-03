const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');


// Create local strategy
const localOptions = { usernameField: 'email' };

// Local login
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    
    // Verify username & password
    // Filter email address in case of any uppercase letter, otherwise it will be unauthorized.
    User.findOne({ email: email.toLowerCase() }, (error, user) => {

        // In case of any error:
        if (error) return done(error);
        
        // If no user is found with the email provided, call done with false.
        if (!user) return done(null, false);
        
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


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};


// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    // Check from payload for existing user ID in database
    User.findById(payload.sub, (error, user) => {

        // In case of any error:
        if (error) return done(error, false);

        // If user ID exists, call 'done' with the user:
        (user) ? done(null, user)

        // Otherwise, call 'done' without a user object:
        : done(null, false);
        
    });
});



// Assign JWT Strategy to passport
passport.use(jwtLogin);
passport.use(localLogin);