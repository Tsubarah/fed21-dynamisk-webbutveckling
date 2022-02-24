const express = require('express');
const pokemonCards = require('./models/pokemonCards');
const app = express();

// Bodyparser omvandlar JSON till object
// Urlencoded omvandlar url till särskilda tecken

// pokemonCards.fetchAll().then(collection => {
//     console.log(collection.toJSON());
// })

// app.get('/', (req, res) => {
//     console.log(req.body);
// })

// app.use() is used to always run this, instead of using it as a callback.
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

app.use('/', require('./routes/index'));

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});

