// Import the required module 'express' to create the router.
const express = require('express');

// Create a new router instance.
const router = express.Router();

// Import the controller module responsible for handling summarization.
const summarizerController = require('../controllers/summarizeController');

// Define a route that listens for POST requests on '/get-summary'.
// When a POST request is received, the 'getSummary' function from the controller will be executed.
router.post('/get-summary', summarizerController.getSummary);

// Export the router instance to be used in other parts of the application.
module.exports = router;
