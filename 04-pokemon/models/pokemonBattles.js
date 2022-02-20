// Important to make sure that it's the bookshelf in this folder './'   Here I read in the ./bookshelf-file.
const bookshelf = require('./bookshelf');
const log = require('debug')('model:pokemonBattles');

// Model is an object from bookshelf which has many built-in functions
const pokemonBattles = bookshelf.Model.extend({
  tableName: 'pokemonBattles'
});

module.exports = pokemonBattles;