// routes/proveedorRoutes.js
const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.post('/', proveedorController.createProveedor);
router.get('/', proveedorController.getProveedores);
router.get('/:id', proveedorController.getProveedor);
router.put('/:id', proveedorController.updateProveedor);
router.delete('/:id', proveedorController.deleteProveedor);
router.post('/upload-masivo', proveedorController.uploadProveedoresMasivos);

module.exports = router;
