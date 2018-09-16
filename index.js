var express = require("express");
var app = express();
var mysql = require("mysql")
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'node_mysql',
//   port: 3306
// });
// connection.connect(function (error) {
//   if (error) {
//     throw error;
//   } else {
//     console.log('Conexion correcta.');
//   }
// });


app.get("/test", function (req, res) {
  console.log("Petición Recibida");
  res.send("HELLOW FRONT");
})

app.listen(3080, () => {
  console.log("Server running on port 3080");
});