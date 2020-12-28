// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Unknown';

io.adapter(redis({ host: 'redis', port: 6379 }));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
    console.log('Hello, I\'m %s, how can I help?', serverName);
});

io.on('connection', function (socket) {
    socket.join(serverName);
    io.to(serverName).emit('hello', "to all clients in  room " + serverName);
    socket.broadcast.emit('new-message', {
        username: serverName,
        message: 'trongnv1'
    });
    socket.emit('my-name-is', serverName);
    socket.on('new-message', function (data) {
        console.log('new-message', data);
    });
    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        console.log('disconnect');
    });
});