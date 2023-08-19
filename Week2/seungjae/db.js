var mysql      = require('mysql2');  //mysql하면 안댐
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'testuser',
  password : '12345678',
  database : 'test1'
});

connection.connect(); //db 연동

module.exports = connection;

// connection.query('SELECT * from users', function (error, results, fields) {
// if (error) throw error;
//   console.log('users: ', results);
// });
 


//connection.end();