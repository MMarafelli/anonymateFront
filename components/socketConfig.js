import socketIo from "socket.io-client";
//http://192.168.0.10:3000
//http://anonymate.com.br
const socket = socketIo('http://anonymate.com.br',
    {
        'reconnection': true,
        'reconnectionDelay': 500,
        'reconnectionAttempts': Infinity,
        transports: ['websocket'], jsonp: false
    });

export default socket;