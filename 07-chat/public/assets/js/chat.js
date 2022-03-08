const messagesEl = document.querySelector('#messages'); // ul element containing all messages
const messageForm = document.querySelector('#message-form');
const messageEl = document.querySelector('#message');

// connect to socket-server
const socket = io();

const addMessageToChat = message => {
		// create new 'li' element
		const liEl = document.createElement('li');
	
		// set content of 'li' to message
		liEl.innerText = message;
		
		//append the message to the ul
		messagesEl.appendChild(liEl);

		// scroll 'li' element into view
		liEl.scrollIntoView();
}

// listen for incoming messages
socket.on('chat:message', message => {
	console.log('Someone said:', message);
	
	addMessageToChat(message);

});

// send message to server

// listen for 'welcome' event
socket.on('welcome', (data) => {
	console.log('A welcome message was received:', data);
});

messageForm.addEventListener('submit', e => {
	e.preventDefault();

	console.log("Someone submitted:", messageEl.value);
	if (!messageEl.value) {
		return;
	}
	
	// send message to server (1st para is the event, 2nd para is the data/message)
	// emit 'chat:message' is sent/shown for everyone EXCEPT the sender
	socket.emit('chat:message', messageEl.value);

	// clear the message
	messageEl.value = '';

});
