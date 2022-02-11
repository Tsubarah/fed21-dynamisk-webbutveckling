const express = require('express');
const app = express();

app.use(express.static('static'));



app.listen(3000, () => {
	console.log(`🥳 Yay, server started at http://localhost:3000`);
});