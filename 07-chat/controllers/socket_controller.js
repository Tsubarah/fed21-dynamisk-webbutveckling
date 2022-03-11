/**
 * Socket Controller
 */

 const debug = require('debug')('chat:socket_controller');

 // list of rooms and their connected users (socket-ids) 
 const rooms = [
     {
         id: 'general',
         name: 'General',
         users: {},
     },
     {
        id: 'major',
        name: 'Major',
        users: {},
    },
    {
        id: 'sergeant',
        name: 'Sergeant',
        users: {},
    },
 ];
 
 let io = null;     // socket.io server instance
 
 const handleDisconnect = function() {
     debug(`Client ${this.id} disconnected :(`);
    
     // find the room that this socket is part of
     const room = rooms.find(chatroom => chatroom.users.hasOwnProperty(this.id));
     
     // if socket was not in a room, dont broadcast disconnect
     if (!room) {
         return;
     }

     // let everyone in the room know that user has disconnected
     this.broadcast.to(room.id).emit('user:disconnected', room.users[this.id]);

     // confirm join 
     callback({
         success: true,
         users: rooms.users
     });
 
     // remove user from list of users in that room
     delete room.users[this.id];
 }
 
 // Handle when a user has joined the chat
 const handleUserJoined = function(username, room_id, callback) {
     // associate socket id with username
     users[this.id] = username;
 
     debug(`User ${username} with socket id ${this.id} wants to join room '${room_id}'`);

     // join room
     this.join(room_id);

     // add socket to list of online users in this room
     // a. Find room object with 'id' == 'general'
     const room = rooms.find(chatroom => chatroom.id === room_id);

     // This is refactored above
    //  const room = rooms.find(chatroom  => {
    //     if (chatroom.id === room_id) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });

     // b. Add socket to room's 'users'object 
     room.users[this.id] = username;

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