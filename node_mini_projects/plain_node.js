// Real Time Chat using plain node js (no framework e.g express)

const http = require('http');
const fs = require('fs');
const querystring = require('querystring')

const port = process.env.PORT | 3000

const server = http.createServer( function(req, res) {
    if(req.url == '/') return respondText(req, res);
    if(req.url == '/json') return respondJson(req, res);
    if(req.url.match(/^\/echo/)) return respondEcho(req, res);

    return respondNotFound(req, res);
})
server.listen(port)
console.log(`Server listening on port ${port}`);

function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Mini Real-Time Chat App');
}

function respondJson(req, res) {
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({name: 'Forester', number: [1, 2, 3, 4]}));
}

function respondEcho(req, res) {
    const { input = ''} = querystring.parse(
        req.url
        .split('?')
        .slice(1)
        .join('')
    );

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
        .split('')
        .reverse()
        .join('')
    }))
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found');
}