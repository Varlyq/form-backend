'user strict';
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : "127.0.0.1",
    user     : "root",
    password : "",
    database : "real_estate",
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