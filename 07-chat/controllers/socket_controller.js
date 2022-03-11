/**
 * Socket Controller
 */

 const debug = require('debug')('chat:socket_controller');

 // list of socket-ids and their usernames
 const users = {};

 module.exports = function(socket) {
     debug('a new client has connected', socket.id);
 
     // handle user disconnect
     socket.on('disconnect', function() {
         debug(`Client ${socket.id} disconnected :(`);

         // let everyone connected know that a specific user has disconnected
         this.broadcast.emit('user:disconnected', users[socket.id]);

         // remove user from list of connected users
         delete users[socket.id];
     });

     // handle user:joined
     socket.on('user:joined', function(username, callback) {
        // connect socket id with username
        //  users[socket.id] is the same as users.socket.id
        users[socket.id] = username;

        debug(`User ${username} with socket id ${socket.id} joined`)

        // broadcast that a new user has connected
        socket.broadcast.emit('user:connected', username);

        // confirm join
        callback({
             success: true,
        });
     });
 
     // handle user emitting a new message
     socket.on('chat:message', function(message) {
         debug('Someone said: ', message);
 
         // emit `chat:message` event to everyone EXCEPT the sender
         this.broadcast.emit('chat:message', message);
     });
 }
 