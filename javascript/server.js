const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  socket.on('chat message', ({ message, name }) => {
    io.emit('chat message', { message, name });
  });
});