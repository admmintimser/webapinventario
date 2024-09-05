const express = require("express");
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


const allowedOrigins = ['https://inventariotimser.azurewebsites.net'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
