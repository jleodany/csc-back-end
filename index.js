const registerUser = require("./functions/user").registerUser
const getUserByToken = require('./functions/globals/common').getUserByToken
const getUsers = require("./functions/user").getUsers
const login = require("./functions/user").login
const logout = require("./functions/user").logout
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

const usersTemp = [
  { userName: 'JoseR', passWord: '26274692' },
  { userName: 'JesusS', passWord: '25778993' },
  { userName: 'JoseV', passWord: '10398563' },
]

const validateUser = async (req, res, next) => {
  console.log('req.method: ', req.method)
  console.log('req.url: ', req.originalUrl)
  let token
  // if(req.originalUrl != '/login'){
  //   if(req.method == 'POST'){
  //     token = req.body.token
  //   } else {
  //     token = req.query.token
  //   }
  //   const userInfo = await getUserByToken(token)
  //   if(!userInfo){
  //     return res.json({ status: 400, message: "Su token ha expirado", succes: false })
  //   }
  //   if(
  //     ( req.originalUrl == '/registerUser' || 
  //       req.originalUrl.includes('/getUsers')) && 
  //       userInfo.type != 1
  //   ) {
  //     return res.json({ status: 400, message: "Usted no es un Administrador", succes: false })
  //   }
  // }
  next()
}

app.use(bodyParser.json());

app.use(validateUser);

app.post("/login", login)

app.get("/logout", logout)

app.post("/registerUser", registerUser)

app.get("/getUsers", getUsers)

app.listen(3080, () => {
  console.log("Server running on port 3080");
});