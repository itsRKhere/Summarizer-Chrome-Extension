// Import required modules and libraries
const requestPromise = require('request-promise'); // Library for making HTTP requests
const cheerio = require('cheerio'); // Library for parsing HTML
const config = require('../config.json'); // Configuration file
const translate = require('translate-google'); // Library for text translation

// Export function that gets the summary
exports.getSummary = async (req, res) => {
    const { url, keySentences, lang } = req.body; // Extract data from request body
    
    // Check if URL is provided
    if (!url) {
        return res.json({
            message: 'failure',
            code: 400,
            errorMessage: 'Invalid URL'
        });
    }

    try {
        // Load website content using cheerio
        const $ = await requestPromise({
            method: 'GET',
            url,
            transform: websiteContent => cheerio.load(websiteContent)
        });

        // Extract title and paragraphs from the website content
        const title = $('title').text();
        const paragraphs = $('*').contents().filter(() => this.type === 'text').text();
        const text = `${title}\n` + paragraphs;

        // Prepare initial prompt for the OpenAI assistant
        let prompt = `You are a helpful assistant that summarizes text. Summarize content in a best way in more than 100 words.`;
        if (keySentences)
            prompt = `You are a helpful assistant, fetch only major points or key sentences i.e only important information from the content, Show separate lines as numeric points and Start with Major points from the content are:.`;

        // Prepare the conversation messages
        const messages = [
            { role: 'system', content: prompt }, // System prompt
            { role: 'user', content: text } // User-provided content
        ];

        // Configure the request to OpenAI API
        const requestConfig = {
            method: 'POST',
            uri: 'https://api.openai.com/v1/chat/completions',
            body: { model: 'gpt-3.5-turbo', messages },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
            },
            json: true
        };

        // Get summary from OpenAI API
        const summary = await requestPromise(requestConfig);
        let classifiedText = summary.choices[0].message.content.replace('\n', '\n\n');

        // Translate the text if requested
        if (lang) {
            classifiedText = await translate(classifiedText, { from: 'en', to: 'hi' });
        };

        // Return the summary result
        return res.json({
            message: 'success',
            code: 200,
            result: classifiedText
        });
    } catch (error) {
        // Handle errors and return appropriate response
        return res.json({
            message: 'failure',
            code: error.statusCode || 500,
            errorMessage: (error.error && error.error.error && error.error.error.message) || error.Error || error.message || "Something went wrong."
        });
    }
};
