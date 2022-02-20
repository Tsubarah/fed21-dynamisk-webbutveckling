// Read in bookshelf connection-file
const bookshelf = require('./bookshelf');
const pokemonCards = require('./pokemonCards');
const log = require('debug')('pokemonFriends');

//Create a model för pokemonFriends
const pokemonFriends = bookshelf.Model.extend({
  tableName: 'pokemonFriends',
  cards() {
    return this.belongsToMany(pokemonCards, 'pokemonFriendCards', 'friend', 'card');
  }
});

module.exports = pokemonFriends;

