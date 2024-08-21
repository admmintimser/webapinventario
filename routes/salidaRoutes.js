// routes/salidaRoutes.js
const express = require('express');
const router = express.Router();
const salidaController = require('../controllers/salidaController');

router.post('/', salidaController.createSalida);
router.get('/', salidaController.getSalidas);
router.get('/:id', salidaController.getSalida);
router.put('/:id', salidaController.updateSalida);
router.delete('/:id', salidaController.deleteSalida);

module.exports = router;
