'user strict';
var mysql = require('mysql');
const { Client } = require('ssh2');
const sshClient = new Client();

// const dbServer = {
//     host: "166.62.27.188",
//     port: 22,
//     user: "f1nzkuwltlgb",
//     password: "o24X}NO?yq",
//     database: "festive2021"
// }

// const tunnelConfig = {
//     host: "166.62.27.188",
//     port: 22,
//     username: "f1nzkuwltlgb",
//     password: "o24X}NO?yq"
// }

// const forwardConfig = {
//     srcHost: '166.62.27.188',
//     srcPort: 3306,
//     dstHost: "192.168.1.103",
//     dstPort: 3306
// };

// const SSHConnection = new Promise((resolve, reject) => {
//     sshClient.on('ready', () => {
//         sshClient.forwardOut(
//         forwardConfig.srcHost,
//         forwardConfig.srcPort,
//         forwardConfig.dstHost,
//         forwardConfig.dstPort,
//         (err, stream) => {
//              if (err) reject(err);
//              const updatedDbServer = {
//                  ...dbServer,
//                  stream
//             };
//             const connection =  mysql.createConnection(updatedDbServer);
//            connection.connect((error) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(connection);
//             });        });
//     }).connect(tunnelConfig);
// });

// var connection = mysql.createConnection({
//     host     : "166.62.27.188",
//     user     : "festive2021",
//     password : "festive@2021",
//     database : "festive2021",
//     port     : 3306,
//     multipleStatements: true,
// });

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