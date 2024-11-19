# Stock Market Chat Rooms
## Main Branch 
- To run the current development of the app on your local device click -> Code -> Copy the url to clipboard for the HTTPS link -> clone the repo and in the terminal run 'cd my-react-app' then 'npm run dev'
- The main feature of the project currently being worked on API called data that renders as graphs on the frontend using Apache Echarts
- The main branch current has all of the features allowing users to create and join rooms, and to send timestamped messages in chat rooms - (feature is current in chatrooms folder)
## Branch stage 1 - Offically created - Implemented and Deleted
- The goal of branch stage 1 is connect our js to the API - Connecting API data to SQlite database 
    - These will initialize be preselected Stocks and ETFs
    - API calls from :https://polygon.io/docs/stocks/getting-started
    - Held in a database currently using SQlite may eventually use SQLAchlemy - Utilizing Node.js
- Connecting the proper Stock or ETF with :https://polygon.io/docs/stocks/getting-started

## Branch stage 2 - Displaying our Stock info into Chart.js 
- The main goal of this branch is to have somewhere to store the data from  the API calls
    - Held in a database currently using SQlite may eventually use SQLAchlemy - Utilizing Node.js
    - In order to start a file type in clear terminal Node {filename.js} - start Node server
    - Display the stocks market graphs with Chart.js - May get pushed to branch 2

## Future Goals -
- Allowing public chats to be displayed
- Creating a functional leave chat button 
- Fix small issue with timestamps that display incorrect times for new individuals entering chats
## Building Notes - 
- Notes of what each JS file should do current
    - Changing API from  
    - start.js should be responsible for responding to user input on the frontend - 
    - home.js should be responsible for the api calls
    - app.js should connect create and connect to the SQlite db - Node.js / Potentially Express.js
    - home.js is hidden because API key is exposed

## Cloning Repo Help + Documentation
- The following link should help with any difficulty cloning the repo :https://docs.github.com/en/enterprise-server@3.11/repositories/creating-and-managing-repositories/cloning-a-repository
- Documentation Links:
    - Apache Echarts - https://echarts.apache.org/en/feature.html
    - Node.js - https://nodejs.org/docs/latest/api/documentation.html
    - SQlite - https://www.sqlite.org/docs.html
    - SQlite + Node.js - https://nodejs.org/api/sqlite.html  
    - Express.js - https://expressjs.com/

## API info 
- Postman: https://www.postman.com/
    - Use post man to check API routes - will require postman-agent install for localhost compatiblity
- https://polygon.io/docs/stocks/getting-started
