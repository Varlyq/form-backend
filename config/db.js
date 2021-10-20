'user strict';
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    port     : 3306,
    multipleStatements: true,
});

connection.connect(function(err) {
    if (err) {
        console.log(err); 
        throw err;
    }
    console.log("Database Connected!");
});

// connection.end();

module.exports = connection;