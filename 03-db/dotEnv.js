require('dotenv').config();
const mysql = require('mysql');


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

  // Get id, name, hp from mySql
  let sql = 'SELECT id, name, hp FROM pokemonCards';
  sql = sql + ' WHERE id = 3';

  // Ask a question to database with .query
  con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('We have a result');
      // console.log(result);
      // result.forEach(row => {
      //     console.log('Pokemon has the name ' + row.name + ' with hp ' + row.hp);
      // });

      for (let i = 0; i < result.length; i++) {
          row = result[i];
          console.log('Pokemon has the name ' + row.name + ' with hp ' + row.hp);
      }

      con.end();
  });
});

//console.log(process.env);
