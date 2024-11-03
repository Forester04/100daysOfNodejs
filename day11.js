// Day 11 - Static Files with Express
// Serve static files using Express middleware
/*
 *First install the serve-static to server files
 * We will use the serve-static middleware to serve files
*/

const express = require('express');
const serveStatic = require('serve-static');

const port = process.env.PORT || 1337;
const app = express();

app.use(serveStatic('public/static', { index: ['default.html', 'default.htm']}))

app.listen(port, () => console.log(`Server listening no ${port}`));