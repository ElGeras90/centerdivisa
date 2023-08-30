'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS

const loginmodel = require('./../model/loginmodel');
const token = require('./../util/token');



function login(req, res) {
  const { usuario, password } = req.body;
console.log(req.body)
  if (!usuario || !password) {
    return res.status(400).json({ error: 'El usuario y la contraseña son requeridos.' });
  }
  const secretKey = 'aB$7pQ2*Zu9!wC8xaB$7pQ2*Zu9!wC8x'

  const token = jwt.sign({ userId: usuario }, secretKey, { expiresIn: '1h' });

  loginmodel.login(req.body)
    .then(info => {
      console.log(info.rows)
      res.status(200).send({ success: true, info: info.rows, Token:token });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}



module.exports = {
  login

};