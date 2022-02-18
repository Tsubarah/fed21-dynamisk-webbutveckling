const bookshelf = require('./bookshelf');

const users = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = users;