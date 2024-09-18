import express from "express";

import {
    createRequisicionCompra,  
    getRequisicionesCompra,
    getRequisicionCompra,  
    updateRequisicionCompra,  
    deleteRequisicionCompra,
    updateProductStatus,
    approveRequisicionCompra 
    }  from "../controllers/requisicionCompraController.js";

const router = express.Router();

router.post('/', createRequisicionCompra);
router.get('/', getRequisicionesCompra);
router.get('/:id', getRequisicionCompra);
router.put('/:id', updateRequisicionCompra);
router.delete('/:id', deleteRequisicionCompra);

// Nueva ruta para actualizar el estatus de un producto
router.put('/:id/producto/:productId/estatus', updateProductStatus);
router.post('/:id/approve', approveRequisicionCompra);

export default router;

