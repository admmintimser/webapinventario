// routes/requisicionSalidaRoutes.js
const express = require('express');
const router = express.Router();
const requisicionSalidaController = require('../controllers/requisicionSalidaController');

router.post('/', requisicionSalidaController.createRequisicionSalida);
router.get('/', requisicionSalidaController.getRequisicionesSalida);
router.get('/:id', requisicionSalidaController.getRequisicionSalida);
router.put('/:id', requisicionSalidaController.updateRequisicionSalida);
router.delete('/:id', requisicionSalidaController.deleteRequisicionSalida);

module.exports = router;
