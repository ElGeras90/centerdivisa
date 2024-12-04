'use strict';
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto');

const loginmodel = require('./../model/loginmodel');
const token = require('./../util/token');
const encriptarjsong = require('./../util/encriptarjson');

function login(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)

  const { usuario, password } = resquest;

  if (!usuario || !password) {

    return res.status(400).json({ error: 'El usuario y la contraseña son requeridos.' });
  }
  const secretKey = process.env.JWT_SECRET;

  loginmodel.login(resquest)
    .then(info => {
      let token = jwt.sign({ userId: info.rows[0].login_usuario.usuario }, secretKey, { expiresIn: '8h' });
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows, Token: token }));


      res.status(200).send({ resultado: data });

    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}



module.exports = {
  login

};