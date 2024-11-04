// 100 Days of Nodejs challenges
// Day 12 - Query Parameters
// Handle query parameters in an Express app
/*
 * Before handling the query parameters in an Express app. Let's first break down the concept to undestand more about query parameter.
 * Query parameters are key value paris the are appended after a ? in a URL. Often GET method use the query parameters to filter, search annd add additional information to the server endpoint. 
 * Handling the query parameters in Express is straight forward. The req object which represents the request sent to the server. The req object contains two objects: req.param and req.query; On req.query - on this property you can go ahead and access the key and value.
 * The router handler in express extracts the parameter from the url
*/

const express = require('express');
const port = process.env.PORT || 1337;

const app = express();

app.get('/search', (req, res) => {
    const queryTerm = req.query.query;
    const category = req.query.category;

    res.send(`Search query ${queryTerm}, Category ${category}`);
})