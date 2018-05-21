const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

// User schema
const googleUserSchema = new Schema({

    googleID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    profileImage: {
        type: String,
        required: false
    }

});


// Adds findOrCreate method to user schema
googleUserSchema.plugin(findOrCreate);



// Model
// Create model class
// A class consists of all users - Loads the schema which correspond with a collection named 'user' into mongoose.
const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

// Export the model
module.exports = GoogleUser;