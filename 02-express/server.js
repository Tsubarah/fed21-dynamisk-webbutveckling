/**
 * express
 */

const express = require('express');
const app = express();

// Respond to GET request for `/`
app.get('/', (req, res) => {
	// req = information om den inkommande förfrågan
	// res = metoder för att skicka ett svar på förfrågan
	console.log(req.method, req.url);

	res.send('Hello from the root.');
});

// Respond to GET-request for `/nom`
app.get('/nom', (req, res) => {
	res.send('Biscuit donut jelly jelly-o dragée oat cake croissant danish. Tart jelly beans liquorice tart chocolate chupa chups. Dragée topping oat cake chocolate dessert.');
});

// Respond to GET-request for `/about`
app.get('/about', (req, res) => {
	res.set('Content-Type', 'text/html');

	res.write('<h1>About</h1>');
	res.write('<p>This is the about page.</p>');
	res.end();
});

// Respond to GET-request for `/api/nom`
app.get('/api/nom', (req, res) => {
	res.send({ msg: 'Cakes are nom-nom-nom.' });
});

// Start listening for incoming requests on port 3000
app.listen(3000, () => {
	console.log(`🥳 Yay, server started at http://localhost:3000`);
});
