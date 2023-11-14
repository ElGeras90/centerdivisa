const jwt = require('jsonwebtoken');

const secretKey = 'aB$7pQ2*Zu9!wC8xaB$7pQ2*Zu9!wC8x';

function generateAuthToken(usuario) {
  return jwt.sign({ usuario }, secretKey, { expiresIn: '12h' });
}

function verifyAuthToken(req, res, next) {
  // Verifica si el encabezado de autorización está presente en la solicitud
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Falta el encabezado de autorización' });
  }

  // Extrae el token JWT del encabezado de autorización
  const token = authorizationHeader.replace('Bearer ', '');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    // El token es válido, puedes acceder a la información del usuario
    req.usuario = decoded.usuario;
    next();
  });
}


module.exports = { generateAuthToken,verifyAuthToken };
