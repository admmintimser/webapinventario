import express from "express";
import {
    createProducto,  
    getProductos,
    getProducto,  
    updateProducto,  
    deleteProducto
    }  from "../controllers/productoController.js";

const router = express.Router();

router.post('/',  createProducto);
router.get('/',  getProductos);
router.get('/:id',  getProducto);
router.put('/:id',  updateProducto);
router.delete('/:id',  deleteProducto);

export default router;


// Rutas similares para las demás entidades.
