const mysql = require("mysql");

function getUserByToken(token) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      
    });
    connection.query('SELECT * FROM session WHERE session.token = ?',
      token, function (error, result, fields) {
        if (error) {
          connection.end();
          reject(error);
        } else {
          console.log(result)
          if (result.length == 0 || !result || result == []) {
            console.log("No hay")
            resolve(false)
          } else {
            console.log('passed')
            connection.query('SELECT * FROM users WHERE users.id = ?',
              result[0].user, function (error, userInfo, fields) {
                if (error) {
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

function getUserHistory(userID) {
  console.log("Looking for ", userID)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      
    });
    connection.query(`SELECT * FROM usersHistory WHERE user = ? AND active = 1`,
    userID, function (error, result, fields) {
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
module.exports.getUserHistory = getUserHistory;

function getUserAllHistory(userID) {
  console.log("Looking for ", userID)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      
    });
    connection.query(`SELECT * FROM usersHistory WHERE user = ?`,
    userID, function (error, result, fields) {
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
module.exports.getUserAllHistory = getUserAllHistory;

function createSession(userID) {
  const token = new Date().getTime()
  const values = [[token, userID]]
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      
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

function searchSession(userID) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      
    });
    connection.query('SELECT * FROM session WHERE session.user = ?',
      userID, function (error, result, fields) {
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
module.exports.searchSession = searchSession;

function updateSessionData(userName, userID, pass){
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      
    });
    connection.query('UPDATE users SET userName = ?, pass = ? WHERE id=?', 
    [userName, pass, userID], function (error, result, fields) {
        if (error) {
          connection.end();
          reject(error);
        } else {
          console.log(result)
          if (result.length == 0 || !result || result == []) {
            console.log("No hay")
            resolve(false)
          } else {
            console.log('passed')
            connection.query('UPDATE usersHistory SET active = ? WHERE user = ?',
              [0, userID], function (error, userInfo, fields) {
                if (error) {
                  connection.end();
                  reject(error)
                } else {
                  let createdAt = new Date().setDate(new Date().getDate() + 7)
                  createdAt = new Date(createdAt).setHours(0, 0, 0, 0)
                  let expires = new Date().setMonth(new Date().getMonth() + 3)
                  expires = new Date(expires).setHours(0, 0, 0, 0)
                  const values = [[null, userID, userName, pass, createdAt, 1, expires]]
                  connection.query('INSERT INTO usersHistory (id, user, userName, pass, createdAt, active, expires) VALUES?',
                    [values], function (error, result) {
                      console.log("INSIDE INSERT FUNCTION");
                      if (error) {
                        console.log("ERROR", error);
                        connection.end()
                        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
                      } else {
                        console.log("SUCCEED");
                        connection.query('UPDATE casos SET userName = ? WHERE user = ?',
                          [userName, userID], function (error, result) {
                            console.log("INSIDE INSERT FUNCTION");
                            if (error) {
                              console.log("ERROR", error);
                              connection.end()
                              return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
                            } else {
                              console.log("SUCCEED");
                              connection.query('UPDATE casos SET operadorName = ? WHERE operador = ?',
                                [userName, userID], function (error, result) {
                                  console.log("INSIDE INSERT FUNCTION");
                                  if (error) {
                                    console.log("ERROR", error);
                                    connection.end()
                                    return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
                                  } else {
                                    console.log("SUCCEED");
                                    connection.end()
                                    resolve(true);
                                    // return res.json({ status: 200, message: "Usuario Registrado Exitosamente", succes: true });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              })
          }
        }
      })
  })
}
module.exports.updateSessionData = updateSessionData