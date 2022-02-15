// Read in bookshelf connection-file
const bookshelf = require('./bookshelf');

//Create a model för pokemonFriends
const pokemonFriends = bookshelf.Model.extend({
  tableName: 'pokemonFriends'
});

module.exports = pokemonFriends;

