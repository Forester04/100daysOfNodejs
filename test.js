const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('My first API');
})
app.get('/status', (req, res) => {
    const status = {
        'status' : 'Running'
    }

    res.send(status);
})
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/submit', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    console.log(firstname)
    console.log(lastname);
})
app.listen(port, () => console.log(`Server listening on ${port}`));