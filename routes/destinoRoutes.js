import express from "express";
import {
    createDestino,
    getDestinos,
    getDestino,
    updateDestino,
    deleteDestino,
    createSalidaDestino,
    getSalidasPorDestino,  // Función para obtener salidas por destino
    getProductosPorDestino
} from "../controllers/destinoController.js";

const router = express.Router();

// Rutas para destinos
router.post('/', createDestino);
router.get('/', getDestinos);
router.get('/:id', getDestino);
router.put('/:id', updateDestino);
router.delete('/:id', deleteDestino);

// Rutas para salidas
router.post('/salidas', createSalidaDestino);
router.get('/:id/salidas', getSalidasPorDestino);  // Mantener esta ruta para salidas
router.get('/:id/productos', getProductosPorDestino); // Ruta para obtener productos por destino

export default router;
