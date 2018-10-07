const mysql = require("mysql");

function getUserByUserName(userNameSent) {
  console.log("Looking for ", userNameSent)
  return new Promise( (resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc'
    });
    connection.query('SELECT * FROM users WHERE users.userName = ?',
      userNameSent, function (error, result, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Result", result);
          connection.end();
          resolve(result);
        }
      }
    )
  }
  )
}

module.exports.getUserByUserName = getUserByUserName;