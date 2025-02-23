/**
 * express
 */

const express = require('express');
const _ = require('lodash');
const morgan = require('morgan');
const oneliners = require('./data/oneliners.json');
const users = require('./data/users.json');

const app = express();

// tell express to use ejs as it's view engine
app.set('view engine', 'ejs');

// // Inject logic to all incoming requests
// app.use((req, res, next) => {
// 	console.log(`Incoming ${req.method} request for ${req.url}`);
// 	next();
// });

// use morgan http request logger
app.use(morgan('dev'));

// Respond to GET request for `/`
app.get('/', (req, res) => {
	res.render('index', {
		title: "My Express Server",
		users
	});
});

// Respond to GET request for `/users/:userId`
app.get('/users/:userId', (req, res) => {
	// Somehow use req.params.userId to get the corresponding user from the users array,
	// and send that user to a view (which displays that user's information)
	console.log(`Would show user with id ${req.params.userId}`);


	res.render('user', {
		fname: users[req.params.userId].name.first,
		lname: users[req.params.userId].name.last,
		city: users[req.params.userId].location.city,
		country: users[req.params.userId].location.country,
		email: users[req.params.userId].email
	});
});

// Respond with current time
app.get('/now', (req, res) => {
	res.send(`The current time is ${new Date()}`);
})

// Respond with a random oneliner joke
app.get('/jokes', (req, res) => {
	// 1. Somehow read the JSON-contents of data/oneliners.json

	// 2. Get a random item from the array
	const oneliner = _.sample(oneliners);

	// 3. Respond with the item (`res.send(item)`)
	res.render('jokes', {
		oneliner,
		title: "A random oneliner for you"
	});
});

// Serve files from `/public` if no other route matches
app.use( express.static('public') );

// Let user know we're sorry
app.use((req, res, next) => {
	res.send('Sorry, we could not find that page.');
});

// Start listening for incoming requests on port 3000
app.listen(3000, () => {
	console.log(`🥳 Yay, server started at http://localhost:3000`);
});
