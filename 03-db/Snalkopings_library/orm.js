const authors = require('./authors');
const titles = require('./titles');


// const attribute = {
//   firstname: "Robert",
//   lastname: 'Jordan'
// };

// let robertJordan = new authors(attribute);
// robertJordan.save().then((res) => {
//   console.log(res.toJSON);
// });

authors.fetchAll().then((res) => {
  console.log(res.toJSON());
})
