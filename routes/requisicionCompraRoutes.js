// routes/requisicionCompraRoutes.js

const express = require('express');
const router = express.Router();
const requisicionCompraController = require('../controllers/requisicionCompraController');

router.post('/', requisicionCompraController.createRequisicionCompra);
router.get('/', requisicionCompraController.getRequisicionesCompra);
router.get('/:id', requisicionCompraController.getRequisicionCompra);
router.put('/:id', requisicionCompraController.updateRequisicionCompra);
router.delete('/:id', requisicionCompraController.deleteRequisicionCompra);
router.post('/:id/approve', requisicionCompraController.approveRequisicionCompra);

// Nueva ruta para actualizar el estatus de un producto
router.put('/:id/producto/:productId/estatus', requisicionCompraController.updateProductStatus);

module.exports = router;
