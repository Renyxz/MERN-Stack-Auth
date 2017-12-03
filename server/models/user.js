const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Tell mongoose about input fields we need.
const bcrypt = require('bcrypt-nodejs');

// Define model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String

});


// On save hook ( before saving the model ), encrypt password
// Fat arrow will break code due to context of 'user' being equal to the model file instead of 'userSchema'.
userSchema.pre('save', function(next) {
    const user = this; // the userSchema object

    bcrypt.genSalt(10, (error, salt) => {
        // If there is an error
        if (error) return next(error);

        // Otherwise, encrypt password
        bcrypt.hash(user.password, salt, null, (error, hash) => {
            // If ther is an error 
            if (error) return next(error);

            // Otherwise, hash the password
            user.password = hash;

            next(); // Proceed with saving the user model
        });
    });
});


// Compare encrypted passwords
// Once again, using fat arrow here will cause 'this.password' to become undefined, 
// which will cause error of 'Incorrect arguments'.
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        
        // In case of error, return callback with error
        if (error) return callback(error);

        // Otherwise, verify passwords are matched.
        callback(null, isMatch);
    });
}


// Create model class
// A class consists of all users - Loads the schema which correspond with a collection named 'user' into mongoose.
const model = mongoose.model('user', userSchema); 

// Export the model
module.exports = model;
