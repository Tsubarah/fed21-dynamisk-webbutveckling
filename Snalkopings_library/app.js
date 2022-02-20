const express = require('express');
const authors = require('./models/authors');
const app = express();
const log = require('./logging');

// Använd static filer
app.use(express.static('/static'));

// Bodyparser omvandlar JSON till object
// Urlencoded omvandlar url till särskilda tecken

// authors.fetchAll().then(collection => {
//     console.log(collection.toJSON());
// })

// app.use() is used to always run this, instead of using it as a callback.
app.use(express.json());
app.use(express.urlencoded( { extended: false }));

app.use('/', require('./routes/index'));

app.listen(3000, () => {
    log.info('Server started at http://localhost:3000');
});