const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/./client');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = new socketIO(server);

app.use(express.static(publicPath));
server.listen(port, ()  => {
    console.log(`Server up on port ${port}.`);
});

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});


