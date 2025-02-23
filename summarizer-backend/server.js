// Importing the 'app' object from the 'index' module and the 'config' JSON file.
const { app } = require('./index');
const config = require('./config.json');

// Extracting the 'PORT' value from the 'config' object.
const PORT = config.PORT;

// Starting the Express server to listen on the specified port.
app.listen(PORT, () => console.log(`Started listening on port ${PORT}!`));
