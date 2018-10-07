const registerUser = require("./functions/user").registerUser
const getUsers = require("./functions/user").getUsers
const login = require("./functions/user").login
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

const usersTemp = [
  { userName: 'JoseR', passWord: '26274692' },
  { userName: 'JesusS', passWord: '25778993' },
  { userName: 'JoseV', passWord: '10398563' },
]

app.use(bodyParser.json());


app.get("/test", function (req, res) {
  console.log("Petición Recibida");
  res.send("HELLOW FRONT");
});

// app.post("/login", function (req, res) {
//   const userRequest = req.body;
//   console.log("Your Params => ", userRequest);
//   console.log("Existing Array => ", usersTemp);
//   let found = false;
//   usersTemp.forEach(user => {
//     console.log("user.userName == userRequest.userName", user.userName, userRequest.userName);
//     console.log("user.passWord == userRequest.passWord", user.passWord, userRequest.passWord);
//     if (user.userName == userRequest.userName &&
//       user.passWord == userRequest.passWord) {
//       found = true;
//     }
//   });
//   res.setHeader('Content-Type', 'application/json');
//   if(found){
//     res.status(200);
//     res.send("Logueado Correctamente");
//   } else {
//     res.status(404);
//     res.send("Error Ingresando usuario o contrase*a");
//   }
// })

app.post("/login", login)

app.post("/registerUser", registerUser)

app.get("/getUsers", getUsers)

app.listen(3080, () => {
  console.log("Server running on port 3080");
});