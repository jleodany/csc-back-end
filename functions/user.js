const {getUserByUserName} = require('./globals/common')

const mysql = require("mysql");

exports.registerUser = (req, res) => {
  const userName = req.body.userName;
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const type = req.body.type;
  if (!userName || !pass || !firstName || !lastName || !email || !type) {
    return res.json({ status: 400, message: "Faltan Datos Obligatorios", succes: false });
  }
  const values = [[null, userName, pass, firstName, lastName, email, type]]
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csc'
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
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        console.log("SUCCEED");
        return res.json({ status: 200, message: "Usuario Registrado Exitosamente", succes: true });
      }
    });
  connection.end()
  console.log("registerUser", req.body);
  // res.send("Ready")
}

exports.getUsers = (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csc'
  });
  connection.query('SELECT * from users', function (error, result, fields) {
    if (error) {
      throw error;
    } else {
      console.log(result);
      return res.json(result)
    }
  })
  connection.end();
  return
}

exports.login = async (req, res) => {
  const userName = req.body.userName;
  const pass = req.body.pass;
  const dbUser = await getUserByUserName(userName)
  if(dbUser.length == 0){
    return res.json({ status: 400, message: "El Usuario Ingresado no Existe", succes: false })
  } else if(dbUser[0].pass != pass){
    return res.json({ status: 400, message: "Contraseña Inválida", succes: false })
  } else {
    return res.json({ status: 200, message: "Usuario Logueado Correctamente", succes: true })
  }
}