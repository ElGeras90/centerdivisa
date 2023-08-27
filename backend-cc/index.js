express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa el paquete cors
const path = require('path'); // Importa el módulo 'path'


const corsOptions = {
    origin: '*', // Cambia esto al dominio de tu aplicación front-end
    methods: 'GET,POST',
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.set('view engine', 'ejs'); 
// Ruta de ejemplo para recibir peticiones GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
// Cargar las rutas
const apiRoutes = require('./routes/api');
app.use('/public', express.static(path.join(__dirname, 'public/')));
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));



// Usar las rutas en la aplicación Express
apiRoutes(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}); 