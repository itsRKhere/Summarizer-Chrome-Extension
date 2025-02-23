// Import required modules
const express = require('express');  // Import the Express framework
const bodyParser = require('body-parser');  // Middleware for parsing request bodies
const app = express();  // Create an Express application
const cors = require('cors');  // Middleware for enabling Cross-Origin Resource Sharing (CORS)

// Middleware setup
app.use(express.json());  // Parse incoming JSON data in requests
app.use(bodyParser.urlencoded({ extended: false }));  // Parse URL-encoded data in requests
app.use(cors());  // Enable CORS for handling cross-origin requests

// Import summarization routes
const summarizationRoutes = require('./routes/summarizerRoutes.js');  // Import custom route handlers
app.use(`/summarize`, summarizationRoutes);  // Mount summarization routes under the '/summarize' endpoint

// Export the Express application instance
module.exports = { app };
