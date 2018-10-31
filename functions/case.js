
const mysql = require("mysql");

exports.registerCase = async (req, res) =>  {
  const { asunto, descripcion, type, userInfo } = req.body
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc',
    port: '3001'
  })
  const date = new Date().setHours(0, 0, 0, 0)
  const values = [[null, asunto, descripcion, date, userInfo.id, null, 'PENDIENTE', type]]
  console.log(values)
  connection.query('INSERT INTO casos (idCaso, asunto, descripcion, f_apertura, user, operador, status, type) VALUES?',
    [values], function(error, result) {
      if(error){
        console.log('ERROR', error)
        return res.json({ status: 400, message: "Error en Inserción de Datos", succes: false })
      } else {
        connection.end()
        return res.json({ status: 200, message: "Caso Aperturado Exitosamente", succes: true });
      }
    })
}

exports.getCases = async (req, res) => {
  const { params, attrib, value, userInfo } = req.body
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'csc',
    port: '3001'
  })
  switch(userInfo.type){
    case 1:
      connection.query('SELECT * FROM casos', function(error, result){
        if(error){
          return res.json({ status: 400, message: "Ocurrió un Error en la Consulta", succes: false })
        } else {
          connection.end()
          return res.json({ status: 200, message: "Consulta Exitosa", succes: true, data: result });
        }
      })
    break;
    case 2:
    break;
    default:
    break;
  }
}