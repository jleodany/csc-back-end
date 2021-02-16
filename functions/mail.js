
const nodemailer = require("nodemailer")
let smtpTransport = require('nodemailer-smtp-transport');
let xoauth2 = require('xoauth2')

function sendMail(mailTo, subject, texto) {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'supmailcsc@gmail.com',//Credenciales de la cuenta google que se va a utilizar
        pass: 'cscAdmin9'//Es importante mencionar que la cuenta google debe tener activa la opción 
        //de permitir aplicaciones no seguras.
      }
    }));
    let mailOptions = {
      from: 'Soporte CSC <supmailcsc@gmail.com>', // sender address
      to: `${mailTo}`, // list of receivers
      subject: `${subject} ✔`, // Subject line
      text: `${texto}`, // plain text body
      html: `${texto}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, _) {
      if (err) {
        // return res.json({ status: 400, message: "Ha Ocurrido un Error Enviando el Correo Electrónico, Verifique su Conexión a Internet", succes: true })
      } else {
        // console.log("It Worked!")
        // return res.json({ mensaje: "Funciona" })
        // connection.end()
        // return res.json({ status: 200, message: "Se ha enviado un Mensaje de Recuperación a su Dirección de Correo Electrónico", succes: true })
      }
    });
  });
}
module.exports.sendMail = sendMail