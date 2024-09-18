import express from "express";
import {
    getUbicaciones,
    getProductsByUbicacion,
    createUbicacion,
    getUbicacion,
    updateUbicacion,
    deleteInventario,
    bulkUploadUbicaciones,
    getUbicacionesPorProducto,
    getInventarios
} from "../controllers/inventarioController.js";

const router = express.Router();

router.post('/', createUbicacion); // Create new Ubicación
router.get('/', getInventarios);   // Get all Ubicaciones
router.get('/:id', getUbicacion);  // Get single Ubicación by ID
router.put('/:id', updateUbicacion);  // Update Ubicación by ID
router.delete('/:id', deleteInventario);  // Delete Ubicación by ID
router.get('/ubicaciones/:productoId', getUbicacionesPorProducto); // Get ubicaciones by product
router.get('/:id/productos', getProductsByUbicacion); // Get products by ubicación
router.post('/bulk-upload', bulkUploadUbicaciones); // Bulk upload ubicaciones

export default router;
