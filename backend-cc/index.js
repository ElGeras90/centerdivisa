express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa el paquete cors
const path = require('path'); // Importa el módulo 'path'
const accesosrol = require('./routes/accesorolRoute');
const cp = require('./routes/cpRoute');
const auth = require('./routes/loginRoute');
const pais = require('./routes/paisRoute');
const enc = require('./routes/encargadoRoute')
const env = require('./routes/cambioroute')

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
app.use('/accsosrol', accesosrol);
app.use('/cp', cp);
app.use('/auth',auth);
app.use('/pais',pais);
app.use('/encargado',enc);
app.use('/divisa',env);

// Usar las rutas en la aplicación Express

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}); 