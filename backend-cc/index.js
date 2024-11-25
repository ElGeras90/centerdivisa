express = require('express');
const app = express();
const port = 3004;
const cors = require('cors'); // Importa el paquete cors
const path = require('path'); // Importa el módulo 'path'
const accesosrol = require('./routes/accesorolRoute');
const cp = require('./routes/cpRoute');
const auth = require('./routes/loginRoute');
const pais = require('./routes/paisRoute');
const enc = require('./routes/encargadoRoute')
const env = require('./routes/cambioroute')
const naproxeno = require('./routes/resetpass')
const diclofenaco = require('./routes/matrizroute')
var helmet = require('helmet');
//const https = require('https');
const fs = require('fs');
const encriptarjsong = require('./util/encriptarjson');
const { js2xml } = require('xml-js');
const regulatorios = require('./routes/regulatorioRoute')
const conta = require('./routes/reportecontables');
// Configurar cabeceras y cors
app.use(helmet());

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

// Configuración adicional de helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      },
    },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'same-origin' },
    featurePolicy: {
      features: {
        geolocation: "'none'",
        midi: "'none'",
        notifications: "'none'",
        push: "'none'",
        syncXhr: "'none'",
        microphone: "'none'",
        camera: "'none'",
        magnetometer: "'none'",
        gyroscope: "'none'",
        speaker: "'self'",
        fullscreen: "'self'",
      },
    },
  })
);
// Ruta de ejemplo para recibir peticiones GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});




// Cargar las rutas
app.use('/accsosrol', accesosrol);
app.use('/cp', cp);
app.use('/auth', auth);
app.use('/pais', pais);
app.use('/encargado', enc);
app.use('/divisa', env);
app.use('/app', naproxeno);
app.use('/matriz', diclofenaco)
app.use('/rg', regulatorios)
app.use('/conta', conta)
// para restablecer la contraseña 

// Configurar opciones SSL
const options = {
  key: fs.readFileSync('key/localhost-key.pem'),
  cert: fs.readFileSync('key/localhost.pem'),
};

// Crear servidor HTTPS
//const server = https.createServer(options, app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${port}`);
});