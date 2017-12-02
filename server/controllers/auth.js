const User = require('../models/user');

exports.signup = (req, res, next) => {
    // Data from the request
    const email = req.body.email;
    const password = req.body.password;

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
            res.json({ success: true });
        });
   
    });

}