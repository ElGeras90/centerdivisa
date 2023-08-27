const jwt = require('jsonwebtoken');

function middlewareDeAutenticacion(req, res) {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtén el token desde la cabecera

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secreto-seguro');
    req.userData = decodedToken; // Almacena los datos decodificados en la solicitud

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

module.exports = { middlewareDeAutenticacion };
