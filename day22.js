// 100 Days of Nodejs challenges
// Day 22 - Async/Await in Nodejs
// Use async/await syntax for asynchronous programming

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const fetchData = () => {
    return new Promise(function(resolve) {
       setTimeout(() => {
        const data = { userId: 1, username: 'Erick'};
        resolve(data);
       })
    })
}


const getData = async () => {
    try {
        const result = await fetchData();
        console.log('Data fetched succesfully');
    } catch(error){
        console.error('Error occured while fetching the data');
    }
}


app.get('/', async (req, res) => {
    const result = await getData();
    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});