// Day 10 - Handling POST Requests
// Parse and handle POST requests in an Express app
// https://medium.com/codex/nodejs-handling-post-requests-3d38f1e7e059

/*POST encloses data in HTTP POST requset body which is not the case in HTTP GET
 *Handling POST resquest we will use a couple of middlewares:
 - Body parser - middleware that parses the request an make it available as an object in req.body property
 - And will got ahead an use .json() and .urlencoded({extended: true}) even though there are other
 middleware library that offer the same service
*/
// Assuming index.html is already setup containing a basic form with a post method and action="/submit"
// Let's go ahead and setup server.js
//run npm install body-parser to install body-parser middleware

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 1337;

const app = express();
// Parsing request using json payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Assuming you have the index.html file in the same directory
});
app.post('/sumbit', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    //Verfication if the excution is successful
    console.log(`Your firstname is ${firstname}`);
    console.log(`Your lastname is ${lastname}`);
});

app.listen(port, () => console.log(`Server is listening on ${port}`));