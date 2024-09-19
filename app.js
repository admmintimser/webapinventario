import express from "express";
import helmet from 'helmet';
import cors from "cors";

import { connectDB } from "./config/db.js"; 

import productoRoutes from './routes/productoRoutes.js';
import entradaRoutes from './routes/entradaRoutes.js';
import salidaRoutes from './routes/salidaRoutes.js';
import requisicionSalidaRoutes from './routes/requisiconSalidaRoutes.js';
import requisicionCompraRoutes from './routes/requisicionCompraRoutes.js';
import inventarioRoutes from './routes/inventarioRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import ubicacionRoutes from './routes/ubicacionRoutes.js'; 
import dashboardRoutes from './routes/dashboardRoutes.js';
import destinoRoutes  from'./routes/destinoRoutes.js';

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
  allowedHeaders: ["Content-Type"],
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
app.use('/api/destinos', destinoRoutes);




connectDB();



export default app;