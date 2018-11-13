const { getUserByUserName, createSession, getUserByToken, getUserByAttrib, searchSession, getUserHistory, getUserAllHistory, updateSessionData } = require('./globals/common')
const randomToken = require('random-token');
const bcrypt = require('bcrypt');
const mysql = require("mysql");

exports.registerUser = async/*<--- importante para usar 'await'*/(req, res) => {
  const userName = req.body.userName.toLowerCase();
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email.toLowerCase();
  const type = req.body.type;
  const myPlaintextPassword = randomToken(10)
  const saltRounds = Math.random() * (11 - 0) + 0;
  const dbUser = await getUserByUserName(userName)
  if (!userName || !pass || !firstName || !lastName || !email || !type) {
    return res.json({ status: 400, message: "Faltan Datos Obligatorios", succes: false });
  }
  if (dbUser.length > 0) {
    return res.json({ status: 400, message: "Usuario Ya Registrado", succes: false })
  } else {
    const userByEmail = await getUserByAttrib('email', email)
    if (userByEmail.length > 0) {
      return res.json({ status: 400, message: "Correo Electrónico Ya Registrado", succes: false })
    } else {
      const hashedPass = bcrypt.hashSync(pass + myPlaintextPassword, saltRounds)
      let splittedSecretWord = ''
      for (let x = 0; x < myPlaintextPassword.length; x++) {
        if (splittedSecretWord == '') {
          splittedSecretWord = myPlaintextPassword.charAt(x).charCodeAt()
        } else {
          splittedSecretWord = splittedSecretWord + '.' + myPlaintextPassword.charAt(x).charCodeAt()
        }
      }
      console.log(splittedSecretWord)
      const passWordToken = Buffer(JSON.stringify({ word: hashedPass, secretWord: splittedSecretWord }), 'binary').toString('base64')
      // const passWordToken = Buffer(JSON.stringify({ word: hashedPass, secretWord: splittedSecretWord }), 'binary')
      console.log('decoded: ', new Buffer(passWordToken, 'base64').toString("ascii"))
      let values = [[null, userName, passWordToken, firstName, lastName, email, type]]
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'csc',
        port: '3001'
      });
      connection.connect(function (error) {
        if (error) {
          console.log("ERROR>", error);
        } else {
          console.log('Conexion correcta.');
        }
      });
      connection.query('INSERT INTO users (id, userName, pass, firstName, lastName, email, type) VALUES?',
        [values], function (error, result) {
          console.log("INSIDE INSERT FUNCTION");
          if (error) {
            console.log("ERROR", error);
            connection.end()
            return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
          } else {
            let createdAt = new Date().setDate(new Date().getDate() + 7)
            createdAt = new Date(createdAt).setHours(0, 0, 0, 0)
            let expires = new Date().setMonth(new Date().getMonth() + 3)
            expires = new Date(expires).setHours(0, 0, 0, 0)
            values = [[null, result.insertId, userName, passWordToken, createdAt, 1, expires]]
            connection.query('INSERT INTO usersHistory (id, user, userName, pass, createdAt, active, expires) VALUES?',
              [values], function (error, result) {
                console.log("INSIDE INSERT FUNCTION");
                if (error) {
                  console.log("ERROR", error);
                  connection.end()
                  return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
                } else {
                  console.log("SUCCEED");
                  connection.end()
                  return res.json({ status: 200, message: "Usuario Registrado Exitosamente", succes: true });
                }
              }
            );
          }
        }
      );
    }
  }
}

exports.modifyUser = async/*<--- importante para usar 'await'*/(req, res) => {
  const id = req.body.id
  const userName = req.body.userName.toLowerCase();
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email.toLowerCase();
  const type = req.body.type;
  const myPlaintextPassword = randomToken(10)
  const saltRounds = Math.random() * (11 - 0) + 0;
  const dbUser = await getUserByUserName(userName)
  if (!userName || !firstName || !lastName || !email || !type) {
    return res.json({ status: 400, message: "Faltan Datos Obligatorios", succes: false });
  } else {
    let passWordToken
    if (pass) {
      const hashedPass = bcrypt.hashSync(pass + myPlaintextPassword, saltRounds)
      let splittedSecretWord = ''
      for (let x = 0; x < myPlaintextPassword.length; x++) {
        if (splittedSecretWord == '') {
          splittedSecretWord = myPlaintextPassword.charAt(x).charCodeAt()
        } else {
          splittedSecretWord = splittedSecretWord + '.' + myPlaintextPassword.charAt(x).charCodeAt()
        }
      }
      console.log(splittedSecretWord)
      passWordToken = Buffer(JSON.stringify({ word: hashedPass, secretWord: splittedSecretWord }), 'binary').toString('base64')
    } else {
      passWordToken = dbUser[0].pass
    }
    // const passWordToken = Buffer(JSON.stringify({ word: hashedPass, secretWord: splittedSecretWord }), 'binary')
    console.log('decoded: ', new Buffer(passWordToken, 'base64').toString("ascii"))
    const values = [[userName, passWordToken, firstName, lastName, email, type, id]]
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'csc',
      port: '3001'
    });
    connection.connect(function (error) {
      if (error) {
        console.log("ERROR>", error);
      } else {
        console.log('Conexion correcta.');
      }
    });
    connection.query('UPDATE users SET userName=?, pass=?, firstName=?, lastName=?, email=?, type=? WHERE id =?',
      [userName, passWordToken, firstName, lastName, email, type, id], function (error, result) {
        console.log("INSIDE INSERT FUNCTION");
        if (error) {
          console.log("ERROR", error);
          connection.end()
          return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
        } else {
          console.log("SUCCEED");
          connection.end()
          return res.json({ status: 200, message: "Usuario Modificado Exitosamente", succes: true });
        }
      }
    );
  }
}

exports.getUsers = async (req, res) => {
  const token = req.query.token
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csc',
    port: '3001'
  });
  connection.query('SELECT * from users', function (error, result, fields) {
    if (error) {
      throw error;
    } else {
      console.log("req.body.userInfo", req.body.userInfo);
      return res.json({ status: 200, message: "Usuarios Consultados Correctamente.", succes: true, data: result })
    }
  })
  connection.end();
  return
}

exports.deleteUser = async (req, res) => {
  const id = req.body.id
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csc',
    port: '3001'
  });
  const dbUser = await getUserByAttrib('id', id)
  if (dbUser.length >= 0) {
    connection.query('DELETE FROM users WHERE id = ?', [id], function (error, result, fields) {
      if (error) {
        return res.json({ status: 400, message: "Ocurrió un Error Eliminando al Usuario.", succes: false, data: result })
      } else {
        console.log("req.body.userInfo", req.body.userInfo);
        return res.json({ status: 200, message: "Usuario Eliminado Correctamente", succes: true, data: result })
      }
    })
    connection.end();
  } else {
    return res.json({ status: 400, message: "El Usuario no Existe.", succes: false, data: result })
  }
  return
}

exports.changePass = async (req, res) => {
  const userName = req.body.userName
  const dbUser = await getUserByUserName(userName)
  if (dbUser.length > 0) {
    return res.json({ status: 200, message: "Se ha enviado un Mensaje de Recuperación a su Dirección de Correo Electrónico", succes: true })
  } else {
    return res.json({ status: 400, message: "El Usuario no se Encuentra Registrado", succes: false })
  }
}

exports.login = async (req, res) => {
  const userName = req.body.userName;
  const pass = req.body.pass;
  const dbUser = await getUserByUserName(userName)
  if (dbUser.length == 0) {
    return res.json({ status: 400, message: "El Usuario Ingresado no Existe", succes: false })
  } else {
    const userID = dbUser[0].id
    const session = await searchSession(userID)
    if (session.length > 0) {
      return res.json({ status: 400, message: "El Usuario ya Posee una Sesión Activa", succes: false })
    }
    const passField = JSON.parse(new Buffer(dbUser[0].pass, 'base64').toString("ascii"))
    let myPlaintextPassword = ''
    const splittedSecretWord = passField.secretWord.split('.')
    splittedSecretWord.forEach(field => {
      myPlaintextPassword = myPlaintextPassword + String.fromCharCode(parseInt(field))
    });
    console.log(passField.word)
    if (!bcrypt.compareSync(pass + myPlaintextPassword, passField.word)) {
      return res.json({ status: 400, message: "Contraseña Inválida", succes: false })
    } else {
      const userHistory = await getUserHistory(dbUser[0].id)
      const actualDate = new Date().setHours(0, 0, 0, 0)
      console.log(userHistory[0].createdAt, actualDate)
      if (userHistory[0].createdAt < actualDate) {
        return res.json({ status: 405, message: "Su Usuario y Contraseña Han Vencido, Debe Crear una Nueva", succes: false })
      }
      const token = await createSession(dbUser[0].id)
      if (token) {
        return res.json({ status: 200, message: "Usuario Logueado Correctamente", succes: true, data: { token: token, userInfo: { id: dbUser[0].id, type: dbUser[0].type } } })
      } else {
        return res.json({ status: 400, message: "Ocurrió un Error Al Iniciar Sesión, Por Favor Inténtelo Nuevamente.", succes: false })
      }
    }
  }
}

exports.changeCredentials = async (req, res) => {
  const { userName, newUserName, pass } = req.body
  const dbUser = await getUserByAttrib('userName', userName)
  if (dbUser.length === 0) {
    return res.json({ status: 400, message: "El Usuario Ingresado no Existe", succes: false })
  }
  const userHistory = await getUserAllHistory(dbUser[0].id)
  let procceed = true
  let message = ''
  // console.log('userHistory', userHistory[0])
  for (let element of userHistory) {
    console.log('element', element)
    const date = new Date().setHours(0, 0, 0, 0)
    const passField = JSON.parse(new Buffer(element.pass, 'base64').toString("ascii"))
    let myPlaintextPassword = ''
    const splittedSecretWord = passField.secretWord.split('.')
    splittedSecretWord.forEach(field => {
      myPlaintextPassword = myPlaintextPassword + String.fromCharCode(parseInt(field))
    });
    const decriptedPass = bcrypt.compareSync(pass + myPlaintextPassword, passField.word)
    console.log(decriptedPass)
    console.log('element.userName: ', element.userName, 'newUserName: ', newUserName)
    if (element.userName === newUserName) {
      if (element.expires > date) {
        procceed = false
        message = 'Debe Ingresar un Nombre de Usuario que no Haya Registrado Anteriormente'
        break
      }
    }
    if (bcrypt.compareSync(pass + myPlaintextPassword, passField.word)) {
      if (element.expires > date) {
        procceed = false
        message = 'Debe Ingresar una Contraseña que no Haya Registrado Anteriormente'
        break
      }
    }
  }
  if (!procceed) {
    return res.json({ status: 400, message: message, succes: false })
  }
  const myPlaintextPassword = randomToken(10)
  const saltRounds = Math.random() * (11 - 0) + 0;
  const hashedPass = bcrypt.hashSync(pass + myPlaintextPassword, saltRounds)
  let splittedSecretWord = ''
  for (let x = 0; x < myPlaintextPassword.length; x++) {
    if (splittedSecretWord == '') {
      splittedSecretWord = myPlaintextPassword.charAt(x).charCodeAt()
    } else {
      splittedSecretWord = splittedSecretWord + '.' + myPlaintextPassword.charAt(x).charCodeAt()
    }
  }
  console.log(splittedSecretWord)
  const passWordToken = Buffer(JSON.stringify({ word: hashedPass, secretWord: splittedSecretWord }), 'binary').toString('base64')
  await updateSessionData(newUserName, dbUser[0].id, passWordToken)
  return res.json({ status: 200, message: "Se Han Actualizado sus Credenciales Exitosamente", succes: true });
}

exports.logout = async (req, res) => {
  const token = req.query.token
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc',
    port: '3001'
  })
  console.log(token)
  connection.query('DELETE FROM session WHERE session.token = ?',
    token, function (error, result, fields) {
      if (error) {
        connection.end()
        console.log(error)
        return res.status(400).end()
      } else {
        connection.end()
        return res.status(200).end()
      }
    })
}