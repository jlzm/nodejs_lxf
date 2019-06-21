const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'jlzm',
    password: '123456',
    database: 'test'
});

connection.connect();

connection.query('SELECT 1 + 1AS solution', function (error, result, fieles) {
    
})