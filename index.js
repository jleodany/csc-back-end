const registerUser = require("./functions/user").registerUser
const getUserByToken = require('./functions/globals/common').getUserByToken
const getUsers = require("./functions/user").getUsers
const modifyUser = require("./functions/user").modifyUser
const deleteUser = require("./functions/user").deleteUser
const login = require("./functions/user").login
const logout = require("./functions/user").logout
const changePass = require("./functions/user").changePass
const changeCredentials = require("./functions/user").changeCredentials
const registerCase = require("./functions/case").registerCase
const uploadFile = require("./functions/case").uploadFile
const getCases = require("./functions/case").getCases
const modifyCase = require("./functions/case").modifyCase
const changeStatus = require("./functions/case").changeStatus
const asignOperator = require("./functions/case").asignOperator
const evaluate = require("./functions/case").evaluate
const setBackUp = require("./functions/backup").setBackUp
const getBackupData = require("./functions/backup").getBackupData
const makeBackUp = require("./functions/backup").makeBackUp
const fs = require('fs')
var express = require("express");
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// const upload = multer({dest: 'uploads/'})
const upload = multer({ storage: storage })
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
  // await makeBackUp()
  if (req.originalUrl != '/login'
    && req.originalUrl != '/registerUser'
    && req.originalUrl != '/changePass'
    && req.originalUrl != '/uploadFile'
    && req.originalUrl != '/changeCredentials'
    && req.originalUrl != '/setBackUp'
    && req.originalUrl != '/download') {
    if (req.method == 'POST') {
      token = req.body.token
    } else {
      token = req.query.token
    }
    const userInfo = await getUserByToken(token)
    if (!userInfo || userInfo == []) {
      console.log("No esta loggeado")
      return res.json({ status: 405, message: "Su token ha expirado", succes: false })
    }
    console.log("userInfo: ", userInfo)
    console.log((req.originalUrl == '/registerUser' || req.originalUrl.includes('/getUsers')) && userInfo.type != 1)
    req.body.userInfo = userInfo
    if (
      (req.originalUrl == '/registerUser' || req.originalUrl.includes('/getUsers')) && userInfo.type != 1
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

app.post("/evaluate", evaluate)

app.post("/uploadFile", upload.single('file'), uploadFile)

app.post('/download', function (req, res) {
  const idCaso = req.body.idCaso
  var file = __dirname + `/uploads/${idCaso}.jpg`; //${req.body.number}
  const bitmap = fs.readFileSync(file)
  return res.json({ status: 200, message: "Datos Consultados Exitosamente", succes: true, data: new Buffer(bitmap).toString('base64') })
});

app.post("/deleteUser", deleteUser)

app.post("/changeStatus", changeStatus)

app.post("/changePass", changePass)

app.post("/changeCredentials", changeCredentials)

app.get('/getUserData', function (req, res) {
  return res.json({ status: 200, message: "Datos Consultados Exitosamente", succes: true, data: req.body.userInfo })
})

app.get('/getBackupData', getBackupData)

const mysql = require("mysql");
app.post('/setBackUp', setBackUp)

app.listen(3080, () => {
  console.log("Server running on port 3080");
});