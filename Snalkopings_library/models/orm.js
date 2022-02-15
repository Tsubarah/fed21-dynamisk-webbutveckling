const authors = require('./authors');
const titles = require('./titles');


// const attribute = {
//   firstname: "J.R.R",
//   lastname: 'Tolkien'
// };

// let tolkien = new authors(attribute);
// tolkien.save().then((res) => {
//   console.log(res.toJSON);
// });


authors.fetchAll().then((res) => {
  console.log(res.toJSON());
});
