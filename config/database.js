var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'smarg123smarg',
    database : 'vehicleCounting',
    dialect: "mysql",
    port : "3306",
    timezone:'+05:30',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
