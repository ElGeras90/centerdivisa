const jwt = require('jsonwebtoken');

function middlewareDeAutenticacion(req, res) {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtén el token desde la cabecera

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'aB$7pQ2*Zu9!wC8xaB$7pQ2*Zu9!wC8x');
    req.userData = decodedToken; // Almacena los datos decodificados en la solicitud

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

module.exports = { middlewareDeAutenticacion };
