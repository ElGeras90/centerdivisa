'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const xd = require('./../model/passresetmodel');

async function resetpass(req, res) {
    const resetTokens = new Map();

    const userEmail = req.body.email;
    const data = "agent1"
    let xl3;

    try {
        const info = await xd.resetpass(data, userEmail);
        xl3 = info.rows;
    } catch (error) {
        res.status(501).send({ success: false, message: error });
    }
    
    if (xl3.length = 1) {
        // Aquí hay al menos una fila en el resultado
        console.log(`Se encontraron ${xl3.length} resultados.`);
        const token = jwt.sign(xl3, 'tu_secreto', { expiresIn: '15m' });
        const recoveryURL = `http://localhost:4200/reset-password/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sistemas@inmtec.net',
              pass: 'rixqpqyvyqsgtlsr',
            },
          });
          const mailOptions = {
            from: 'sistemas@inmtec.net',
            to: userEmail,
            subject: 'Recuperación de contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${recoveryURL}`,
          };
        
          // Enviar el correo
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
            res.status(500).send({ message: 'Error al enviar el correo' });
            }else{
                res.status(200).send({ success: true, message:'se envio el correo' });
            }
            console.log('Correo enviado:', info.response);
        });

    } else {
        // No se encontraron resultados
        res.status(200).send({ success: true, message:'Comunicate con el administrador de sistemas' });

    }

  }
  
 
  module.exports = {

    resetpass,
  

  };