
// Create connection to mySQL database
const mysql = require('mysql');

// Create connection information
let con = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'Pokemon'
    }
);

// Connect to server
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

        // End server connection
        con.end();
    });
});

