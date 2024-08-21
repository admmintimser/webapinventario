// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.post('/', productoController.createProducto);
router.get('/', productoController.getProductos);
router.get('/:id', productoController.getProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;

// Rutas similares para las demás entidades.
