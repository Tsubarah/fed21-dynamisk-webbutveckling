const bookshelf = require('./bookshelf');

const titles = bookshelf.Model.extend({
  tableName: 'titles'
});

module.exports = titles;
