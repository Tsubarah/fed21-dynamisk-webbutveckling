// Important to make sure that it's the bookshelf in this folder './'   Here I read in the ./bookshelf-file.
const bookshelf = require('./bookshelf');
const pokemonBattles = require('./pokemonBattles');

// Model is an object from bookshelf which has many built-in functions
const pokemonCards = bookshelf.Model.extend({
  tableName: 'pokemonCards',
  battles() {
    return this.hasMany(pokemonBattles, 'wonBattles');
    return this.hasMany(pokemonBattles, 'lostBattles');
  }
});

module.exports = pokemonCards;