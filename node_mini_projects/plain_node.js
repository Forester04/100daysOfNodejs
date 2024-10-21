// Real Time Chat using plain node js (no framework e.g express)

const http = require('http');
const fs = require('fs');
const querystring = require('querystring')
const EventEmitter = require('events');

const chatEmitter = new EventEmitter()

const port = process.env.PORT | 3000

const server = http.createServer( function(req, res) {
    if(req.url == '/') return respondText(req, res);
    if(req.url == '/json') return respondJson(req, res);
    if(req.url.match(/^\/echo/)) return respondEcho(req, res);
    if(req.url.match(/^\/static\/.*/)) return respondStatic(req, res);
    if(req.url.match(/^\/chat/)) return respondChat(req, res)
    if(req.url.match(/^\/sse/)) return respondSSE(req, res)


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
    res.end(JSON.stringify({name: 'Real-Time Chat App', version: "1.01"}));
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

function respondStatic(req, res) {
    const filepath = req.url.split('/static')[1];

    const filename = `${__dirname}/static${filepath}`;

    fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}

function respondChat(req, res) {
    const { message } = querystring.parse()

    chatEmitter.emit('message', message)
    res.end()
    new window.EventSource('/sse').onmessage = function (event) {
    window.messages.innerHTML += `<p>${event.data}<p>`
    }
}

function respondSSE(req, res) {
    res.writeHead(200, {
        'Content-Type' : 'text/event-stream',
        'Connection' : 'keep-alive'
    })

    const onMessage = msg => res.write(`data: ${msg}\n\n`)
    chatEmitter.on('message', onMessage)

    res.on('close', function () {
        chatEmitter.off('message', onMessage)
    })
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found');
}