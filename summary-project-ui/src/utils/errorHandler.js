// It takes two parameters: setError function and an error object.
export const showError = (setError, error) => {
    // Check if the error message is related to internet connection.
    if(error.message === "Please check your internet connection"){
        return setError(error.message);
    }

    // Check if the error message is related to undefined property access.
    if (error.message === "Cannot read properties of undefined (reading 'query')") {
        // If the error is specific, set an error message related to Chrome plugin installation.
        return setError("Please install this plugin on Chrome");
    }

     // Check if the error message is related to server.
    if(error.code === "ERR_NETWORK"){
        return setError("Server seems busy. Please try again later.");
    }

    // If the error is not specific, set the error message.
    return setError("Oops.. Something went wrong");
};
