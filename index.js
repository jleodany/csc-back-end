const registerUser = require("./functions/user").registerUser
const getUserByToken = require('./functions/globals/common').getUserByToken
const getUsers = require("./functions/user").getUsers
const modifyUser = require("./functions/user").modifyUser
const login = require("./functions/user").login
const logout = require("./functions/user").logout
const registerCase = require("./functions/case").registerCase
const getCases = require("./functions/case").getCases
const modifyCase = require("./functions/case").modifyCase
const asignOperator = require("./functions/case").asignOperator
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
  if(req.originalUrl != '/login' && req.originalUrl != '/registerUser'){
    if(req.method == 'POST'){
      token = req.body.token
    } else {
      token = req.query.token
    }
    const userInfo = await getUserByToken(token)
    if(!userInfo){
      return res.json({ status: 400, message: "Su token ha expirado", succes: false })
    }
    console.log("userInfo: ", userInfo)
    console.log((req.originalUrl == '/registerUser' || req.originalUrl.includes('/getUsers')) && userInfo.type != 1)
    req.body.userInfo = userInfo
    if(
      ( req.originalUrl == '/registerUser' || req.originalUrl.includes('/getUsers')) && userInfo.type != 1
    ) {
      return res.json({ status: 400, message: "Usted no es un Administrador", succes: false })
    }
  }
  // console.log("User", req.body.userInfo)
  next()
}

app.use(bodyParser.json());

app.use(validateUser);

app.post("/login", login)

app.get("/logout", logout)

app.post("/registerUser", registerUser)

app.post('/registerCase', registerCase)

app.get("/getUsers", getUsers)

app.post("/getCases", getCases)

app.post("/asignOperator", asignOperator)

app.post("/modifyUser", modifyUser)

app.post("/modifyCase", modifyCase)

app.get('/getUserData', function(req, res){
  return res.json({ status: 200, message: "Datos Consultados Exitosamente", succes: true, data: req.body.userInfo })
})

app.listen(3080, () => {
  console.log("Server running on port 3080");
});