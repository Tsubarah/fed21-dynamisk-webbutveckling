const socket = io();

const startEl = document.querySelector('#start');
const chatWrapperEl = document.querySelector('#chat-wrapper');
const usernameForm = document.querySelector('#username-form');
const messagesEl = document.querySelector('#messages'); // ul element containing all messages
const messageForm = document.querySelector('#message-form');
const messageEl = document.querySelector('#message');

let username = null;

const addMessageToChat = (message, ownMsg = false) => {
	// create new `li` element
	const liEl = document.createElement('li');

	// set class of `li` to `message`
	liEl.classList.add('message');

	// set content of `li` element
	liEl.innerHTML = ownMsg
	 ? message.content
	 : `<span class='user'>${message.username}</span>: ${message.content}`;

	if (ownMsg) {
		liEl.classList.add('you');
	}

	// append `li` element to `#messages`
	messagesEl.appendChild(liEl);

	// scroll `li` element into view
	liEl.scrollIntoView();
}

const addNoticeToChat = notice => {
	const liEl = document.createElement('li');
	liEl.classList.add('notice');

	liEl.innerText = notice;

	messagesEl.appendChild(liEl);
	liEl.scrollIntoView();
}

// listen for when a new user connects
socket.on('user:connected', (username) => {
	addNoticeToChat(`${username} connected`);
});

// listen for when a user disconnects
socket.on('user:disconnected', (username) => {
	addNoticeToChat(`${username} disconnected`);
});

// listen for incoming messages
socket.on('chat:message', message => {
	console.log("Someone said:", message);

	addMessageToChat(message);
});

// get username from form and emit `user:joined` and then show chat
usernameForm.addEventListener('submit', e => {
	e.preventDefault();

	username = usernameForm.username.value;

	// emit `user:joined` event, and once received acknowledgement -> show the chat
	socket.emit('user:joined', username, (status) => {
		console.log('Server ackowledged that user joined', status)

		if (status.success) {
			// hide start view
			startEl.classList.add('hide');

			// show chat view
			chatWrapperEl.classList.remove('hide');

			// focus on inputMessage
			messageEl.focus();
		}
	});
});

// send message to server
messageForm.addEventListener('submit', e => {
	e.preventDefault();

	if (!messageEl.value) {
		return;
	}

	const msg =  { 
		// username: username,
		username, 
		content: messageEl.value 
	}

	// send message to server
	socket.emit('chat:message', msg);

	// add message to chat
	addMessageToChat(msg, true);

	// clear message input element and focus
	messageEl.value = '';
	messageEl.focus();
});

