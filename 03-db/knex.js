require('dotenv').config();
const mysql = require('mysql');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

// Selects the table pokemonCards from the database and gets the data/result
/*
knex.select().table('pokemonCards').then((result) => {
  console.log(result);
  result.forEach(result => {
    console.log('Pokemon with the name ' + result.name + ' has hp ' + result.hp);
  });
});
*/

/*
// Within select you can choose what tab you want to target. For ex. id and name.
// SELECT id, name, hp FROM pokemonCards WHERE id IN (2, 4, 6)
knex.select('id', 'name', 'hp').whereIn('id', [2, 4, 6]).table('pokemonCards').then((result) => {
  console.log(result);
});
*/


knex('pokemonCards').where('id', 1).select().then((result) => {
  console.log(result);
});



// 'Fulhack' to avoid pressing ctrl-c to close connection. ~Same function as Nodemon.
/*
const s = 1;
setTimeout(() => {
  process.exit(0); },
  s*1000
);
*/