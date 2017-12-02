const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Tell mongoose about input fields we need.


// Define model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String

});

// Create model class
// A class consists of all users - Loads the schema which correspond with a collection named 'user' into mongoose.
const model = mongoose.model('user', userSchema); 

// Export the model
module.exports = model;