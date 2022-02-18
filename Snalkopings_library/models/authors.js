const bookshelf = require('./bookshelf');
const titles = require('./titles');

const authors = bookshelf.Model.extend({
  tableName: 'authors',
  showTitles() {
    return this.hasMany(titles, 'authorId');
  }
});

module.exports = authors;