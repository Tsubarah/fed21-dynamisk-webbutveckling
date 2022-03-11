/**
 * Socket Controller
 */

 const debug = require('debug')('chat:socket_controller');

 // list of socket-ids and their username
 const users = {};
 
 let io = null;     // socket.io server instance
 
 const handleDisconnect = function() {
     debug(`Client ${this.id} disconnected :(`);
 
     // let everyone connected know that user has disconnected
     this.broadcast.emit('user:disconnected', users[this.id]);
 
     // remove user from list of connected users
     delete users[this.id];
 }
 
 // Handle when a user has joined the chat
 const handleUserJoined = function(username, room, callback) {
     // associate socket id with username
     users[this.id] = username;
 
     debug(`User ${username} with socket id ${this.id} wants to join room '${room}'`);

     // join room
     this.join(room);
 
     // let everyone know that someone has connected to the chat
     this.broadcast.to(room).emit('user:connected', username);
 
     // confirm join
     callback({
         success: true,
     });
 }
 
 const handleChatMessage = function(message) {
     debug('Someone said: ', message);
 
     // emit `chat:message` event to everyone EXCEPT the sender
     this.broadcast.to(message.room).emit('chat:message', message);
 }

 // first things that happens when a client connects
 module.exports = function(socket, _io) {
    io = _io;

    debug('a new client has connected', socket.id);

    io.emit("new-connection", "A new user connected");

    // handle user disconnect
    socket.on('disconnect', handleDisconnect);

    // handle user joined
    socket.on('user:joined', handleUserJoined);

    // handle user emitting a new message
    socket.on('chat:message', handleChatMessage);
 }