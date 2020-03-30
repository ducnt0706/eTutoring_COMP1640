const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const app = express();

//Middleware

// Make sure policy
app.use(cors({ origin: true }));

// Set default of app
app.use(express.static('../public'));

// Routes Api
app.use('/api', require('./routers/api'));

// Export express application so it can be accessed.
exports.app = functions.https.onRequest(app);


/*
==================================Some notices=================================
+ must change version of node in folder to meeting with Node version in locally installed v12

*/