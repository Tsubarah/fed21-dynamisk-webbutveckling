require('dotenv').config();
const mysql = require('mysql');

// Create connection and get data from env(environment) variables
let con = mysql.createConnection(
  {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  }
);

con.connect(function(err) {
  //console.log(err.message);
  if (err) throw err;

  console.log('Connected to database');

  /*// con.query(sql, placeholder data, callback);
  let sql = 'INSERT INTO pokemonCards (name, hp) VALUES (?, ?)';
  let data = ['Talonflame', 130];
  con.query(sql, data, function(err, result) {
    if (err) throw err;
    console.log(result);
  }); */

  /*
  let sql = 'INSERT INTO pokemonCards SET ?';
  let data = {
    name: 'Gourgeist',
    hp: 100
  };
  con.query(sql, data, function(err, result) {
    if (err) throw err;
    console.log(result);
  })
  */

  let sql = 'SELECT id, name, hp FROM pokemonCards WHERE hp >= ?';
  let data = [100];
  con.query(sql, data, function(err, result) {
    if (err) throw err;
    console.log(result);
  })
});

