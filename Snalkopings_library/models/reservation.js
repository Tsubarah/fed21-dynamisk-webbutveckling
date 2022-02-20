const bookshelf = require('./bookshelf');

const reservation = bookshelf.Model.extend({
  tableName: 'reservation'
});

module.exports = reservation;