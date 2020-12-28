const io = require('socket.io-client');

const socket = io('http://localhost:3000', {
    // transports: ['polling']
    transports: ['websocket']
});
socket.on('connect', (e) => { console.log('connect') })
socket.on('my-name-is', (e) => console.log('my-name-is', e))
socket.on('hello', (e) => console.log('hello', e))
socket.emit('new-message', 'trongnv')
socket.on('new-message', (e) => console.log('new message', e))
// for (let index = 0; index < 100; index++) {
//     socket.emit('hello', index);
// }