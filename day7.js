// Day 7: Routing Server
// Implement simple routing for different HTTP endpoints

const http = require('http');

const port = process.env.PORT || 1337;

const server = http.createServer( function(req, res) {
    if (req.url == '/') return respondChat(req, res);
    respondNotFound(req, res);
})

server.listen(port);
console.log(`Server listening ${port}`);

function respondChat(req, res) {
    res.end('100daysOfNodejs');
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type' : 'text/plain'});
    res.end('Page Not Found');
}