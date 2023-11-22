const exp = require('constants')
const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


//socket

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    // Emit a 'user joined' message to all clients when a new user connects
    socket.broadcast.emit('message', {
        user: 'Server',
        message: 'A new user has joined the chat.'
    });

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});
