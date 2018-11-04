const mysql = require("mysql");

function getUserByToken(token) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
    });
    connection.query('SELECT * FROM session WHERE session.token = ?',
      token, function (error, result, fields) {
        if (error) {
          connection.end();
          reject(error);
        } else {
          console.log(result)
          if(result.length == 0 || !result || result == []){
            resolve(false)
          } else {
            console.log('passed')
            connection.query('SELECT * FROM users WHERE users.id = ?',
            result[0].user, function(error, userInfo, fields){
              if(error){
                connection.end();
                reject(error)
              } else {
                connection.end()
                resolve(userInfo[0]);
              }
            })
          }
        }
      })
  })
}
module.exports.getUserByToken = getUserByToken

function getUserByUserName(userNameSent) {
  console.log("Looking for ", userNameSent)
  return new Promise((resolve, reject) => {
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

function getUserByAttrib(attrib, value) {
  console.log("Looking for ", attrib, value)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
    });
    connection.query(`SELECT * FROM users WHERE ${attrib} = ?`,
      value, function (error, result, fields) {
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
module.exports.getUserByAttrib = getUserByAttrib;

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
        if (error) {
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