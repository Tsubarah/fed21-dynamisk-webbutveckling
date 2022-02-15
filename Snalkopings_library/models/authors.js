const bookshelf = require('./bookshelf');

const authors = bookshelf.Model.extend({
  tableName: 'authors'
});

module.exports = authors;