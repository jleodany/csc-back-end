const mysql = require("mysql");

function getUserByUserName(userNameSent) {
  console.log("Looking for ", userNameSent)
  return new Promise( (resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
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

function createSession(userID) {
  const token = new Date().getTime()
  const values = [[token, userID]]
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
    });
    connection.query('INSERT INTO session (token, user) VALUES?', [values], 
      function (error, result) {
        if(error){
          connection.end()
          resolve(false)
        } else {
          connection.end()
          resolve(token)
        }
    })
  })
}
module.exports.createSession = createSession;