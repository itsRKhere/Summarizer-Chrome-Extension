import axios from 'axios';
import config from '../config.json';

// Function to fetch summarization or key sentences using the provided URL, key sentences, and language.
// Takes url (string), keySentences (boolean), and lang (string) as parameters.
export async function fetchSummarizationOrKeySentences(url, keySentences, lang) {
    // Send a POST request to the summarization API endpoint with the provided data.
    return axios.post(`${config.apiBaseUrl}/summarize/get-summary`, { url, keySentences, lang })
        .then((resp) => {
            const responseBody = resp.data;

            // Check if the response indicates success.
            if (responseBody.message === 'success') {
                return responseBody; // Return the response body if successful.
            }

            // If not successful, create an error with the error message from the response.
            const err = new Error(responseBody.errorMessage);
            err.data = responseBody;
            err.code = responseBody.code;
            throw err; // Throw the error to be caught by the caller.
        })
        .catch((err) => {
            throw err; // Re-throw any caught errors for the caller to handle.
        });
};
