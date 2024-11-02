const bodyParser = require('body-parser');
const express = require('express');
const port = process.env.PORT || 1337;

const app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})




app.listen(port, () => console.log(`Server listening on ${port}`));