const express = require("express");
const { main } = require("./models/index");
const proveedorRoutes = require("./router/proveedor");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8080;

connectDB();


const productoRoutes = require('./routes/productoRoutes');
const entradaRoutes = require('./routes/entradaRoutes');
const salidaRoutes = require('./routes/salidaRoutes');
const requisicionSalidaRoutes = require('./routes/requisiconSalidaRoutes');
const requisicionCompraRoutes = require('./routes/requisicionCompraRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();
main();
const allowedOrigins = [
  'https://inventariotimser.azurewebsites.net',
  'https://apiwebinventariotimser.azurewebsites.net'
];

// Flexible CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
      if (!origin) return callback(null, true);  // Allow requests with no origin (like mobile apps or curl requests)
      
      if (allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          console.warn(`Blocked CORS request from disallowed origin: ${origin}`);
          callback(new Error('Not allowed by CORS'), false);
      }
  },
  method: [
      "GET", "POST", "DELETE", "PUT"
  ],
  optionsSuccessStatus: 200
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

app.use('/api/productos', productoRoutes);
app.use('/api/entradas', entradaRoutes);
app.use('/api/salidas', salidaRoutes);
app.use('/api/requisicion-salida', requisicionSalidaRoutes);
app.use('/api/requisicion-compra', requisicionCompraRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ubicaciones', ubicacionRoutes); 
app.use('/api/dashboard', dashboardRoutes);

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
