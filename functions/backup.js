const { getUserByUserName, createSession, getUserByToken, getUserByAttrib, searchSession, getUserHistory, getUserAllHistory, updateSessionData } = require('./globals/common')
const randomToken = require('random-token');
const bcrypt = require('bcrypt');
const mysql = require("mysql");
const fs = require('fs');

exports.setBackUp = async (req, res) => {
  const { active, time } = req.body
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
    });
    connection.query('SELECT * FROM backup', function (error, result, fields) {
      console.log('result: ', result)
      let nextBackup = new Date().setDate(new Date().getDate() + Number(time))
      nextBackup = new Date(nextBackup).setHours(0, 0, 0, 0)
      console.log(nextBackup)
      const query = result.length === 0
        ? 'INSERT INTO backup (id, active, nextBackup, lastBackup, time) VALUES?'
        : 'UPDATE backup SET active=?, nextBackup=?, time=? WHERE id=?'
      const values = result.length === 0
        ? [[[null, active, nextBackup, null, time]]]
        : [active, nextBackup, time, result[0].id]
      if (query) {
        console.log('Entra')
        connection.query(query, values, function (error, result, fields) {
          if (error) {
            connection.end()
            return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
          } else {
            connection.end()
            return res.json({ status: 200, message: "Configuración Guardada Exitósamente", succes: true });
          }
        })
      }
    })
  })
}

exports.getBackupData = async (req, res) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
    });
    connection.query('SELECT * FROM backup', function (error, result, fields) {
      if (error) {
        return res.json({ status: 400, message: "Error en consulta", succes: false })
      } else {
        let data;
        if (result.length > 0) {
          data = result[0]
        } else {
          data: ''
        }
        return res.json({ status: 200, message: "Datos Consultados Correctamente.", succes: true, data: data })
      }
    })
  })
}

function makeBackUp() {
  return new Promise((resolve, reject) => {
    console.log('Dentro')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'csc',
      port: '3001'
    });
    let arrayToFile = []
    connection.query('SELECT * FROM backup', function (error, result, fields) {
      if (result.length === 0) {
        console.log(result.length)
        resolve(true)
      } else {
        console.log('else')
        let date = new Date().setHours(0, 0, 0, 0)
        if (date >= result[0].nextBackup) {
          const backupRow = result[0]
          connection.query('SELECT * FROM users', function (error, result, fields) {
            arrayToFile.push('Users: ')
            arrayToFile.push('id, userName, firstName, lastName, email, type')
            console.log('users')
            for (item in result) {
              arrayToFile.push(`${result[item].id}, ${result[item].userName}, ${result[item].firstName}, ${result[item].lastName}, ${result[item].email}, ${result[item].type}`)
            }
            connection.query('SELECT * FROM casos', function (error, result, fields) {
              arrayToFile.push('Casos: ')
              arrayToFile.push('idCaso, asunto, descripcion, f_apertura, f_mod, user, userName, operador, operadorName, status, file, type')
              console.log('casos')
              for (item in result) {
                arrayToFile.push(`${result[item].idCaso}, ${result[item].asunto}, ${result[item].descripcion}, ${result[item].f_apertura}, ${result[item].f_mod}, ${result[item].user}, ${result[item].userName}, ${result[item].operador}, ${result[item].operadorName}, ${result[item].status},${result[item].file}, ${result[item].type}`)
              }
              connection.query('SELECT * FROM usersHistory', function (error, result, fields) {
                arrayToFile.push('usersHistory: ')
                arrayToFile.push('id, user, userName, createdAt, active, expires')
                console.log('usersHistory')
                for (item in result) {
                  arrayToFile.push(`${result[item].id}, ${result[item].user}, ${result[item].userName}, ${result[item].createdAt}, ${result[item].active}, ${result[item].expires}`)
                }
                connection.query('SELECT * FROM session', function (error, result, fields) {
                  arrayToFile.push('session: ')
                  arrayToFile.push('id, token, user')
                  console.log('session')
                  for (item in result) {
                    arrayToFile.push(`${result[item].id}, ${result[item].token}, ${result[item].user}`)
                  }
                  connection.query('SELECT * FROM backup', function (error, result, fields) {
                    arrayToFile.push('backup: ')
                    arrayToFile.push('id, active, nextBackup, lastBackup')
                    console.log('backup')
                    for (item in result) {
                      arrayToFile.push(`${result[item].id}, ${result[item].active}, ${result[item].nextBackup}, ${result[item].lastBackup}`)
                    }
                    let date = new Date()
                    date = date.getDate() + '' + (date.getMonth() + 1) + '' + date.getFullYear()
                    let file = fs.createWriteStream('backup/bu' + date + '.txt');
                    file.on('error', function (err) { /* error handling */ });
                    console.log('arrayToFile', arrayToFile)
                    arrayToFile.forEach(function (v) {
                      file.write(v + '\n');
                    });
                    file.end();
                    let nextBackup = new Date().setDate(new Date().getDate() + Number(backupRow.time))
                    nextBackup = new Date(nextBackup).setHours(0, 0, 0, 0)
                    connection.query('UPDATE backup SET nextBackup=?, lastBackup=? WHERE id=?',
                      [nextBackup, backupRow.nextBackup, backupRow.id], function (error, result, fields) {
                        if (error) {
                          reject(false)
                        } else {
                          resolve(true)
                        }
                      }
                    )
                  })
                })
              })
            })
          })
        } else {
          resolve(true)
        }
      }
    })
  })
}
module.exports.makeBackUp = makeBackUp;