/**
 * Socket Controller
 */

const debug = require('debug')('chat:socket_controller');

module.exports = function(socket) {
	debug('A new client has connected', socket.id);

	// socket.emit('welcome', 'Welcome to Chat 3000!');
    socket.on('disconnect', function() {
        debug(`user ${this.id} has left the chat`);
    });

    // Receives the message from chat.js
    socket.on('chat:message', function(message) {
        debug('Someone said:', message);

        this.broadcast.emit('chat:message', message);
    });
}