const { getUserByUserName, createSession, getUserByToken } = require('./globals/common')
const randomToken = require('random-token');
const bcrypt = require('bcrypt');
const mysql = require("mysql");

exports.registerUser = async/*<--- importante para usar 'await'*/(req, res) => {
  const userName = req.body.userName;
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
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
    const values = [[null, userName, passWordToken, firstName, lastName, email, type]]
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'csc',
      port: '3306'
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
          console.log("SUCCEED");
          connection.end()
          return res.json({ status: 200, message: "Usuario Registrado Exitosamente", succes: true });
        }
      }
    );
  }
}

exports.modifyUser = async/*<--- importante para usar 'await'*/(req, res) => {
  const id = req.body.id
  const userName = req.body.userName;
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
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
    const values = [[userName, passWordToken, firstName, lastName, email, type, id]]
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'csc',
      port: '3306'
    });
    connection.connect(function (error) {
      if (error) {
        console.log("ERROR>", error);
      } else {
        console.log('Conexion correcta.');
      }
    });
    connection.query('UPDATE users SET userName=?, pass=?, firstName=?, lastName=?, email=?, type=? WHERE id =?',
      [values], function (error, result) {
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
    port: '3306'
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

exports.login = async (req, res) => {
  const userName = req.body.userName;
  const pass = req.body.pass;
  const dbUser = await getUserByUserName(userName)
  if (dbUser.length == 0) {
    return res.json({ status: 400, message: "El Usuario Ingresado no Existe", succes: false })
  } else {
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
      const token = await createSession(dbUser[0].id)
      if (token) {
        return res.json({ status: 200, message: "Usuario Logueado Correctamente", succes: true, data: { token: token, userInfo: {id: dbUser[0].id, type: dbUser[0].type} } })
      } else {
        return res.json({ status: 400, message: "Ocurrió un Error Al Iniciar Sesión, Por Favor Inténtelo Nuevamente.", succes: false })
      }
    }
  }
}

exports.logout = async (req, res) => {
  const token = req.query.token
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc',
    port: '3306'
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