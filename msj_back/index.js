// =========================
// Importar dependencias
// =========================
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// =========================
// Configuración del servidor
// =========================
const app = express();
const server = http.createServer(app);

// =========================
// Configuración de CORS
// =========================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

// =========================
// Configurar Socket.IO
// =========================
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// =========================
// Mapa de usuarios autenticados
// =========================
const authenticatedUsers = new Map(); // socket.id -> username

// =========================
// Eventos de conexión
// =========================
io.on('connection', (socket) => {
  console.log(`🟢 Nueva conexión: ${socket.id}`);

  // Autenticación del usuario
  socket.on('authenticate', (username) => {
    if (!username || typeof username !== 'string') {
      socket.emit('error', { message: 'Nombre de usuario inválido.' });
      return;
    }

    authenticatedUsers.set(socket.id, username);
    console.log(`✅ Usuario autenticado: ${username}`);
    socket.emit('authenticated', { message: 'Autenticación exitosa.' });
  });

  // Mensajes privados
  socket.on('privateMessage', ({ recipient, message }) => {
    const senderUsername = authenticatedUsers.get(socket.id);
    if (!senderUsername) {
      socket.emit('error', { message: 'No estás autenticado.' });
      return;
    }

    if (!recipient || !message) {
      socket.emit('error', { message: 'Faltan datos en el mensaje.' });
      return;
    }

    // Buscar el socket del destinatario
    const recipientSocketId = [...authenticatedUsers.entries()]
      .find(([, username]) => username === recipient)?.[0];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('privateMessage', {
        sender: senderUsername,
        message
      });
      console.log(`📩 ${senderUsername} → ${recipient}: ${message}`);
    } else {
      socket.emit('userUnavailable', { recipient });
      console.log(`⚠️ ${recipient} no está disponible.`);
    }
  });

  // Desconexión del usuario
  socket.on('disconnect', () => {
    const username = authenticatedUsers.get(socket.id);
    if (username) {
      authenticatedUsers.delete(socket.id);
      console.log(`🔴 Usuario desconectado: ${username}`);
    } else {
      console.log(`🔴 Socket desconectado sin autenticarse: ${socket.id}`);
    }
  });
});

// =========================
// Iniciar servidor
// =========================
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
