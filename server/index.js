const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');


// App
const app = express();

// Router
const router = require('./router');

// Database connection
const mongoDB = {
    test: config.testDB,
};

mongoose.connect(mongoDB.test)
.then( () => {
    console.log('Connected to mongodb');
},
error => {
    console.log(error.name, ': ', error.message);
});


// App configurations

// Passport
app.use(passport.initialize());
require('./services/passport');



// Body Parser
// // parse application/json
app.use(bodyParser.json({ type: '*/*' })); 

// This will prevent error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
app.use( (req,res,next) => {
    let _send = res.send;
    let sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});



// Router setup
router(app);


// Server setup
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server listening on: ', port);
});