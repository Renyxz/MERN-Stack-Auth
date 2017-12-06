const http = require('http');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// App
const app = express();

// Router
const router = require('./router');

// DB Setup
mongoose.connect(config.db, {
    useMongoClient: true
});



// App setup
// Middlewares - any incoming request will pass into them
app.use(morgan('combined')); // Mostly used for debugging.
app.use(bodyParser.json({ type: '*/*' })); // Parse incoming request into JSON format, regardless of data type.

// Router setup
router(app);


// Server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);

console.log('Server listening on: ', port);
