# Summarizer

`Summarizer` is a Chrome browser extension designed to provide users with concise summaries or key highlights of web pages. It offers this functionality in both English and Hindi languages. Users can use the extension to quickly grasp the main points or essential information from a webpage without having to read through the entire content.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Techonlogies Used](#techonolgies-used)
- [Credits](#credits)

## Installation

1. Clone repository:
   
```
git clone https://github.com/itsRKhere/Summarizer-Chrome-Extension.git
 
```

2. Build the React frontend:

```
cd summary-project-ui
npm install
npm run build
```

3. Install the Chrome Extension:

- Open Chrome.
- Go to `chrome://extensions/`.
- Enable "Developer mode".
- Click on "Load unpacked".
- Select the `build` folder from the React build output.

4. Run the Node.js server:
```
cd summarizer-backend
npm install
npm start
```


##  How to Use

    1. Once the extension is installed, navigate to a web page  you want to summarise.
    2. Click on the extension icon in the Chrome toolbar.
    3. Initially auto selects "Summary" but later you can select either "Summary" or "Major Points" from the dropdown.
    4. Choose your preferred language (English or Hindi).
    5. Click the "dropdown" button to obtain the summary/major  points.
    6. You can copy the content by clicking the copy icon.
    7. To change the language, click on the language icon.
    8. You can skip the typing animation by clicking "Skip".

## Features

- Get Summary or Major points of a web page.
- Choose between English and Hindi languages.
- Copy the summarized content.
- Skip the typing animation.
- User-friendly Chrome extension interface.

## Technologies Used

- JavaScript
- React Js
- Node Js
- Chrome Extension API 

## Credits

`Summarizer` utilizes `OpenAI` API to provide results.

Please note that due to the non-subscription nature of the API's operation, there may be a temporary delay of a few seconds in receiving the response.