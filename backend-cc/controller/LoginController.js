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
  const secretKey = 'JUANGERARDOGARCIASALAZAR'

  const token = jwt.sign({ userId: usuario }, 'secreto-seguro', { expiresIn: '1h' });

  const decryptedBytes = crypto.AES.decrypt(password, secretKey);
  const decryptedPassword = decryptedBytes.toString(crypto.enc.Utf8);


  console.log('Datos descifrados:', decryptedPassword);




  // Ejemplo de respuesta exitosa
  return res.status(200).json({ success: true, message:token });
}

function categorias(req, res) {

  const authResult = token.middlewareDeAutenticacion(req, res);

  // Si el middleware devuelve una respuesta, detén el proceso
  if (authResult) {
    return;
  }

  loginmodel.consultarUsuarios()
    .then(info => {
      res.status(200).send({ success: true, info: info.rows });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}
/**function loginx(req, res) {
    console.log('Iniciando consulta de categorías...');
    const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    if (authResult) {
      return;
    }
    
    loginmodel.consultarUsuarios1('agent1', '827ccb0eea8a706c4c34a16891f84e7b')
    .then(info => {
      console.log('Consulta exitosa. Resultados:', info.rows);
      res.status(200).send({ success: true, info: info.rows });
    })
    .catch(error => {
      console.log('Error en la consulta:', error);
      res.status(501).send({ success: false, message: error });

    });
}*/
function loginx(req, res) {
  const { usuario, contraseña } = req.query;
  loginmodel.consultarUsuarios1(usuario, contraseña)
    .then(result => {
      const usuarios = result.rows[0].login_user.usuarios;
      const menus = result.rows[0].login_user.menus;
      const agencia = result.rows[0].login_user.agencia;
      const sucursales = result.rows[0].login_user.sucursales;
      console.log(usuarios)
      const token = jwt.sign({ userId: usuario }, 'secreto-seguro', { expiresIn: '1h' });
      console.log(token)
      res.render('usuarios', { usuarios, menus, agencia, sucursales }); // Renderiza la vista 'usuarios.ejs' con los datos
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Error al cargar la vista');
    });
}

function infocliente(req, res) {
  const { usuario, inversion } = req.query;
  loginmodel.consultadatos_cliente(usuario, inversion)
    .then(result => {

      console.log(result.rows[0].rqr)
      const cliente = result.rows[0].rqr.cliente;
      const inversion = result.rows[0].rqr.invesion;
      const nombrecliente = result.rows[0].rqr.cliente[0].razon_social;
      res.render('userinfo', { cliente, inversion, nombrecliente }); // Renderiza la vista 'usuarios.ejs' con los datos
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Error al cargar la vista');
    });

}

module.exports = {
  login,
  categorias,
  loginx,
  infocliente
};