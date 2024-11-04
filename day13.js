const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Book App: Simple RESTfull API');
});
app.post('/book', (req, res) => {
    res.send('Created book successfully');
});
app.put('/book/:id', (req, res) => {
    res.send('Updated book successfully using book id');
});
app.delete('/book/:id', (req, res) => {
    res.send('Book deleted successfully');
});

app.listen(port, () => console.log(`Server listenig on ${port}`));