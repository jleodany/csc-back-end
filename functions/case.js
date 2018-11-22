
const getUserByAttrib = require('../functions/globals/common').getUserByAttrib
const mysql = require("mysql");
const multer = require("multer")
const upload = multer({dest: 'uploads/'})

exports.registerCase = async (req, res) => {
  const { asunto, descripcion, type, userInfo, file } = req.body
  // const registerer = await getUserById(userInfo.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc', port: 3001
    
  })
  const date = new Date().setHours(0, 0, 0, 0)
  const values = [[null, asunto, descripcion, date, date, userInfo.id, userInfo.userName, null, null, 'PENDIENTE', file, type]]
  console.log(values)
  connection.query('INSERT INTO casos (idCaso, asunto, descripcion, f_apertura, f_mod, user, userName, operador, operadorName, status, file, type) VALUES?',
    [values], function (error, result) {
      if (error) {
        console.log('ERROR', error)
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        console.log(result)
        connection.end()
        return res.json({ status: 200, message: "Caso Aperturado Exitosamente", succes: true, data: result });
      }
    })
}

exports.uploadFile = async (req, res) => {
  return res.json({ status: 200, message: "Caso Aperturado Exitosamente", succes: true});
}

exports.modifyCase = async (req, res) => {
  const { asunto, descripcion, type, userInfo, idCaso, file } = req.body
  // const registerer = await getUserById(userInfo.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc', port: 3001
    
  })
  const date = new Date().setHours(0, 0, 0, 0)
  const values = [[asunto, descripcion, date, type, idCaso]]
  console.log(values)
  connection.query('UPDATE casos SET asunto=?, descripcion=?, f_mod=?, file=?, type=? WHERE idCaso=?', 
    [asunto, descripcion, date, file, type, idCaso], function (error, result) {
      if (error) {
        console.log('ERROR', error)
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        connection.end()
        return res.json({ status: 200, message: "Caso Modificado Exitosamente", succes: true });
      }
    })
}

exports.evaluate = async (req, res) => {
  const { idCaso, evaluation } = req.body
  // const registerer = await getUserById(userInfo.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc', port: 3001
    
  })
  const date = new Date().setHours(0, 0, 0, 0)
  // const values = [[asunto, descripcion, date, type, idCaso]]
  // console.log(values)
  connection.query('UPDATE casos SET evaluated=1, evaluation=? WHERE idCaso=?', 
    [evaluation, idCaso], function (error, result) {
      if (error) {
        console.log('ERROR', error)
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        connection.end()
        return res.json({ status: 200, message: "Caso Evaluado Exitosamente", succes: true });
      }
    })
}

exports.changeStatus = async (req, res) => {
  const { idCaso, status } = req.body
  // const registerer = await getUserById(userInfo.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc', port: 3001
    
  })
  const date = new Date().setHours(0, 0, 0, 0)
  connection.query('UPDATE casos SET status=? WHERE idCaso=?', 
    [status, idCaso], function (error, result) {
      if (error) {
        console.log('ERROR', error)
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        connection.end()
        return res.json({ status: 200, message: "Caso Modificado Exitosamente", succes: true });
      }
    })
}

exports.asignOperator = async (req, res) => {
  const { idCaso, idOperador } = req.body
  // const registerer = await getUserById(userInfo.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc', port: 3001
    
  })
  const userInfo = await getUserByAttrib('id', idOperador)
  const values = [idOperador, userInfo[0].userName, idCaso]
  connection.query(`UPDATE casos SET operador = ?, operadorName = ? WHERE idCaso = ?`,
    values, function (error, result) {
      if (error) {
        console.log('ERROR', error)
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        connection.end()
        return res.json({ status: 200, message: "Operador Asignado Exitosamente", succes: true });
      }
    }
  )
}

exports.getCases = async (req, res) => {
  const { params, attrib, value, userInfo } = req.body
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc', port: 3001
    
  })
  switch (userInfo.type) {
    case 1:
      console.log("Admin")
      connection.query(params ? `SELECT * FROM casos WHERE ${attrib}=?` : `SELECT * FROM casos`, value,
        function (error, result) {
          if (error) {
            console.log(error)
            return res.json({ status: 400, message: "Ocurrió un Error en la Consulta", succes: false })
          } else {
            connection.end()
            return res.json({ status: 200, message: "Consulta Exitosa", succes: true, data: result });
          }
        })
      break;
    case 2:
      console.log("Operator")
      const sqlOp = `SELECT * FROM casos WHERE casos.user=? OR casos.operador=? `
      connection.query(params ? sqlOp + ` AND ${attrib}=?` : sqlOp, [userInfo.id, userInfo.id, value],
        function (error, result) {
          if (error) {
            console.log(error)
            return res.json({ status: 400, message: "Ocurrió un Error en la Consulta", succes: false })
          } else {
            connection.end()
            return res.json({ status: 200, message: "Consulta Exitosa", succes: true, data: result });
          }
        })
      break;
    default:
      console.log("User")
      const sql = `SELECT * FROM casos WHERE casos.user=${userInfo.id}`
      connection.query(params ? sql + ` AND ${attrib}=?` : sql, value,
        function (error, result) {
          if (error) {
            console.log(error)
            return res.json({ status: 400, message: "Ocurrió un Error en la Consulta", succes: false })
          } else {
            connection.end()
            return res.json({ status: 200, message: "Consulta Exitosa", succes: true, data: result });
          }
        })
      break;
  }
}