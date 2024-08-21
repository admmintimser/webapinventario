// routes/entradaRoutes.js
const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');

router.post('/', entradaController.createEntrada);
router.get('/', entradaController.getEntradas);
router.get('/:id', entradaController.getEntrada);
router.put('/:id', entradaController.updateEntrada);
router.delete('/:id', entradaController.deleteEntrada);

module.exports = router;
