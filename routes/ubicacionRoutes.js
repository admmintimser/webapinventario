const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');

router.post('/', ubicacionController.createUbicacion);
router.get('/', ubicacionController.getUbicaciones);

// Place this route before the `/:id` route
router.get('/:id/productos', ubicacionController.getProductsByUbicacion);

router.get('/:id', ubicacionController.getUbicacion);
router.put('/:id', ubicacionController.updateUbicacion);
router.delete('/:id', ubicacionController.deleteUbicacion);

router.post('/bulk-upload', ubicacionController.bulkUploadUbicaciones);

module.exports = router;
