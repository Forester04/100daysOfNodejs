const fs = require('fs')
const express = require('express')
const EventEmitter = require('events')

const chatEmitter = new EventEmitter()
const port = process.env.PORT || 1337

const app = express()

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.get('/chat', respondChat)
app.get('/sse', respondSSE)
app.get('/logs', respondLogs)
app.get('/previous', respondPrevious)



app.listen(port, () => console.log(`Server listening on ${port}`))

function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Happy to print my first server')
}
function respondJson(req, res) {
    res.json({ text: 'Forester', number: [1, 2, 3, 4]})
}
function respondEcho(req, res) {
    const {input = ''} = req.query

    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
        .split('')
        .reverse()
        .join('')
    })
}
function respondStatic(req, res) {
    const filename = `${__dirname}/mini-real-time-chat/public/${req.params[0]}`
    fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}
function respondChat(req, res) {
    const { message } = req.query

    chatEmitter.emit('message', message)
    res.end()
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

function respondLogs(req, res) {
    const { message }  = req.query

    if (!message) {
        res.status(400).send('Message is required'); // Handle missing message error
        return;
    }

    const filename = `${__dirname}/chat-log.txt`;

    fs.appendFile(filename, message + '\n\n', (err) => {
        if (err) {
            console.log('Logging failed');
        } else {
            console.log('Logged Successfully');
        }
    })
}
console.log(respondLogs());

function respondPrevious(req, res) {
    const filename = `${__dirname}/chat-log.txt`
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type' : 'text/plain'});
            res.end('Error reading the file');
        } else {
            res.writeHead(200, {'Content-Type' : 'text/plain'});
            res.end(data);
        }
    })
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('Not Found')
}