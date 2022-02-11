const pokemonCards = require('./pokemonCards');
const pokemonFriends = require('./pokemonFriends');

// Model is a description of data

/*
// Uses our pokemon model and gets all the rows from pokemonCards database, and puts it in collection
pokemonCards.fetchAll().then((collection) => {
  // console.log(collection);
  console.log(collection.toJSON());
});
*/


/*
// Uses count method from bookshelfjs.org
pokemonCards.count().then((count) => {
  console.log('We now have ' + count + ' pokemons');
});
*/

/*
// pokemonCards is a model. where is also a model. Uses fetch to get the actual data. 
pokemonCards.where({'hp': 100}).fetch().then((collection) => {
  console.log(collection.toJSON());
});
*/

/*
// Create a new pokemonCards model
const attribute = {
  name: 'Skrelp',
  hp: '50'
};
let skrelp = new pokemonCards(attribute);
skrelp.save().then((res) => {
  console.log(res);
});
*/



// destroy() is used to delete

pokemonFriends.fetchAll().then((result) => {
  console.log(result.toJSON());
});

for(let i = 0; i < 11; i++) {
  const friends = {
    name: 'Nodemon' +i,
    email: 'nodemon' + i + '@email.nu'
  }
  let friendsList = pokemonFriends(friends);
  friendsList.save().then((res) => {
  console.log(res);
});
};


