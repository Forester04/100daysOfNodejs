// 100 Days of Nodejs challenges
// Day 23 - Basic WebSocket Server
// Create a WebSocket server using the ws library

const express = require('express');
const { WebSocketServer } = require('ws');

require('dotenv').config();
const PORT = 1337;
const WS_PORT = 8081;

const app = express();

app.get('/', (req, res) =>
   res.sendFile('/websocket.html', { root: __dirname })
 )
 .listen(PORT, () => console.log(`Listening on ${PORT}`))

const socketServer = new WebSocketServer({ port: WS_PORT});
socketServer.on('connection', ws => {
    console.log('New client made a connection');
    ws.send('Connection Established');
    ws.on('message', data => {
        socketServer.clients.forEach(client => {
            console.log(`Distributing messages: ${data}`);
            client.send(`${data}`);
        })
    })
    ws.onerror = function () {
        console.log('websocket error');
    }
});